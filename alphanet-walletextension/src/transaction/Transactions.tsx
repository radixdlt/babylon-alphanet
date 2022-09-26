import {
  Box,
  Button,
  Typography,
  Card as MuiCard,
  CardContent,
  CardActions,
  ButtonGroup,
  TextField,
  Alert,
  AlertTitle,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  removeAllTransactions,
  removeTransaction,
  submitTransaction,
  Transaction,
} from "./transactionState";
import { useTransactions } from "./useTransactions";
import { AppRoute } from "routes";

const EmptyState = () => {
  const navigate = useNavigate();
  return (
    <Alert severity="info">
      <AlertTitle>No transactions found</AlertTitle>
      Try adding a{" "}
      <strong
        style={{ textDecoration: "underline", cursor: "pointer" }}
        onClick={() => navigate(AppRoute.Manifest)}
      >
        transaction manifest
      </strong>{" "}
      to see list of transactions.
    </Alert>
  );
};

const Receipt: React.FC<{
  receipt: Transaction["receipt"];
  intentHash: string;
}> = ({ receipt, intentHash }) => {
  if (!receipt) return null;
  const stringifiedReceipt = JSON.stringify(
    {
      intentHash,
      newGlobalEntities:
        receipt?.committed?.receipt?.state_updates?.new_global_entities!.map(
          (item) => ({
            entity_type: item.entity_type,
            global_address: item.global_address,
          })
        ) || "",
    },
    null,
    2
  );
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Receipt</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              value={
                stringifiedReceipt.length > 100_000
                  ? "Receipt is too large. Preview disabled"
                  : stringifiedReceipt
              }
              multiline
              size="small"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              sx={{
                ".MuiOutlinedInput-input": { fontSize: "10px" },
              }}
            ></TextField>
            <Button
              fullWidth
              onClick={() => {
                navigator.clipboard.writeText(stringifiedReceipt);
                toast.info("Receipt copied to clipboard");
              }}
              size="small"
            >
              Copy receipt
            </Button>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

const Manifest: React.FC<{
  transactionManifest: Transaction["transactionManifest"];
}> = ({ transactionManifest }) => (
  <Box sx={{ mb: 2 }}>
    <TextField
      value={
        transactionManifest
          ? transactionManifest.length > 100000
            ? "Manifest is too large. Preview disabled"
            : transactionManifest
          : " "
      }
      multiline
      size="small"
      fullWidth
      InputProps={{
        readOnly: true,
      }}
      label="Manifest"
      maxRows={5}
      sx={{
        ".MuiOutlinedInput-input": {
          fontSize: "10px",
          overflowX: "hidden",
        },
      }}
    ></TextField>
    <Button
      fullWidth
      onClick={() => {
        navigator.clipboard.writeText(transactionManifest || " ");
        toast.info("Transaction manifest copied to clipboard");
      }}
      size="small"
    >
      Copy manifest
    </Button>
  </Box>
);

const RemoveAllTransactions = () => (
  <Button size="small" fullWidth onClick={async () => removeAllTransactions()}>
    Remove all transactions
  </Button>
);

const TransactionItem: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <MuiCard key={transaction.id} sx={{ m: "12px" }}>
      <CardContent>
        <Manifest transactionManifest={transaction.transactionManifest} />
        <Receipt
          intentHash={transaction.intentHash}
          receipt={transaction.receipt}
        />
      </CardContent>
      <CardActions>
        <ButtonGroup fullWidth>
          <Button
            size="small"
            onClick={async () => removeTransaction(transaction.id)}
            disabled={loading}
          >
            Delete
          </Button>
          {!transaction.receipt && (
            <Button
              size="small"
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                await submitTransaction(transaction);
                setLoading(false);
              }}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          )}
        </ButtonGroup>
      </CardActions>
    </MuiCard>
  );
};

export const Transactions: React.FC = () => {
  const transactions = useTransactions();
  if (transactions.length === 0) return <EmptyState />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <RemoveAllTransactions />
      <Box sx={{ overflow: "auto", height: 455 }}>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </Box>
    </Box>
  );
};

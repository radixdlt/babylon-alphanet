import { Box, Button, TextField } from "@mui/material";
import { useActiveAddress } from "address/useActiveAddress";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "routes";
import { addTransaction } from "./transactionState";

export const TxManifest: React.FC = () => {
  const [txManifest, setTxManifest] = useState<string>("");
  const navigate = useNavigate();
  const activeAddress = useActiveAddress();
  const lockFeeTextRow = activeAddress
    ? `CALL_METHOD ComponentAddress("${activeAddress.accountAddress}") "lock_fee" Decimal("100");\n`
    : "";

  return (
    <Box>
      <TextField
        size="small"
        fullWidth
        value={txManifest}
        onChange={(ev) => {
          setTxManifest(ev.target.value);
        }}
        sx={{
          mb: 2,
          ".MuiFormHelperText-root": { mr: 0, ml: 0 },
          ".MuiOutlinedInput-input": { fontSize: "12px" },
        }}
        multiline
        minRows={15}
        InputLabelProps={{
          shrink: true,
        }}
        label="Transaction manifest"
        variant="outlined"
        maxRows={15}
      />
      <Button
        variant="text"
        onClick={() => {
          setTxManifest((prev) => `${lockFeeTextRow}${prev}`);
        }}
        sx={{ mb: 2 }}
        fullWidth
      >
        Add lock fee
      </Button>
      <Button
        variant="outlined"
        onClick={async () => {
          await addTransaction(txManifest, []);
          navigate(AppRoute.Transactions);
        }}
        fullWidth
      >
        Add manifest
      </Button>
    </Box>
  );
};

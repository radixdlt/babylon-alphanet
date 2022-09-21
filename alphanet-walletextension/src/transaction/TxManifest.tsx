import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "routes";
import { addTransaction } from "./transactionState";

export const TxManifest: React.FC = () => {
  const [txManifest, setTxManifest] = useState<string>("");
  const navigate = useNavigate();

  return (
    <Box>
      <TextField
        size="small"
        fullWidth
        defaultValue={txManifest}
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
        variant="outlined"
        onClick={async () => {
          await addTransaction(txManifest, []);
          navigate(AppRoute.Transactions);
        }}
        sx={{ mb: 2 }}
        fullWidth
      >
        Add manifest
      </Button>
    </Box>
  );
};

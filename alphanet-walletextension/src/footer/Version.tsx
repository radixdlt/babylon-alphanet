import { Typography } from "@mui/material";
import React from "react";
import { config } from "../config";

export const Version = () => (
  <Typography style={{ fontSize: 14, textAlign: "center" }}>
    {config.version}
  </Typography>
);

import { Alert, Box } from "@mui/material";
import React from "react";
import { Header } from "../header/Header";

export const PageLayout: React.FC = ({ children }) => (
  <Box
    sx={{
      width: "320px",
      height: "600px",
      overflow: "hidden",
    }}
  >
    <Box
      sx={{
        fontSize: 12,
        textAlign: "center",
        backgroundColor: "primary.main",
        color: "white",
        fontWeight: "500",
        pt: 0.5,
        pb: 0.5,
      }}
    >
      This is for Babylon Alpha purpose only!
    </Box>
    <Box sx={{ pl: 1, pr: 1 }}>
      <Header />
      <Box sx={{ minHeight: 515 }}>{children}</Box>
    </Box>
  </Box>
);

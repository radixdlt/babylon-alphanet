import { Box, Typography, TypographyProps } from "@mui/material";
import React from "react";

export const Card: React.FC<{
  title: string;
  variant?: TypographyProps["variant"];
}> = ({ title, children, variant = "h6" }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant={variant}>{title}</Typography>
      {children}
    </Box>
  );
};

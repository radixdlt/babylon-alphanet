import { Grid } from "@mui/material";
import React from "react";
import { ActiveAddresses } from "address/ActiveAddress";

export const Header: React.FC = () => (
  <Grid container justifyContent={"space-between"}>
    <Grid item sx={{ alignSelf: "center" }}>
      <ActiveAddresses />
    </Grid>
  </Grid>
);

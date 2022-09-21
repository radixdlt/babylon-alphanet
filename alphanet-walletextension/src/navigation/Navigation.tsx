import { Tab, Tabs } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoute } from "routes";

export const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <Tabs
        value={location.pathname}
        onChange={(_, value) => {
          navigate(value);
        }}
        sx={{ mb: 2 }}
        variant="fullWidth"
        centered
        scrollButtons="auto"
      >
        <Tab label="Manifest" value={AppRoute.Manifest} />
        <Tab label="Transactions" value={AppRoute.Transactions} />
      </Tabs>
    </>
  );
};

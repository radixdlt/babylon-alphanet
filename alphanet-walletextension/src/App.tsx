import React, { useEffect } from "react";
import { PageLayout } from "./layouts/PageLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { getActiveAddress } from "address/addressState";
import { AppRoute } from "routes";
import { AppRouter } from "AppRouter";

export const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getActiveAddress().mapErr(() => {
      if (location.pathname !== AppRoute.AccountAddresses)
        navigate(AppRoute.AccountAddresses);
    });
  }, []);

  return (
    <PageLayout>
      <AppRouter />
    </PageLayout>
  );
};

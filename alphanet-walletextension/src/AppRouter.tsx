import React from "react";
import { Main } from "./main/Main";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "routes";
import { Transactions } from "./transaction/Transactions";
import { Addresses } from "./address/Addresses";
import { TxManifest } from "./transaction/TxManifest";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Main />}>
        <Route index element={<Transactions />} />
        <Route path={AppRoute.Transactions} element={<Transactions />} />
        <Route path={AppRoute.Manifest} element={<TxManifest />} />
      </Route>
      <Route path={AppRoute.AccountAddresses} element={<Addresses />} />
    </Routes>
  );
};

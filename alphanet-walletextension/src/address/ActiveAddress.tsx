import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "routes";
import { useActiveAddress } from "./useActiveAddress";

export const ActiveAddresses = () => {
  const navigate = useNavigate();

  const address = useActiveAddress();

  return (
    <Button
      onClick={() => {
        navigate(AppRoute.AccountAddresses);
      }}
    >
      {address
        ? `${address.accountAddress.slice(
            0,
            5
          )}...${address.accountAddress.slice(-5)}`
        : ""}
    </Button>
  );
};

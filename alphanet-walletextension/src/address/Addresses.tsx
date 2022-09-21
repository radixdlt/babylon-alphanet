import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppRoute } from "routes";
import { createAddress, setActiveAddress } from "./addressState";
import { useActiveAddress } from "./useActiveAddress";
import { useAddresses } from "./useAddresses";

export const Addresses = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const addresses = useAddresses();
  const activeAddress = useActiveAddress();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
        {addresses.length > 0 ? "Select account" : "Create account"}
      </Typography>
      <Box sx={{ overflow: "auto", height: 395 }}>
        {addresses.map((address) => {
          const selected =
            address.accountAddress === activeAddress?.accountAddress;
          return (
            <Card
              key={address.accountAddress}
              sx={{
                mb: 2,
              }}
              variant="outlined"
            >
              <CardContent>
                <Chip
                  label={address.accountAddress}
                  variant={selected ? "filled" : "outlined"}
                />
              </CardContent>
              <CardActions>
                <ButtonGroup fullWidth size="small">
                  <Button
                    onClick={async () => {
                      await setActiveAddress(address);
                      navigate(AppRoute.Main);
                    }}
                    disabled={selected || loading}
                  >
                    {selected ? "Selected" : "Select"}
                  </Button>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(address.accountAddress);
                      toast.info("Account address copied to clipboard");
                    }}
                  >
                    Copy
                  </Button>
                </ButtonGroup>
              </CardActions>
            </Card>
          );
        })}
      </Box>
      <Button
        fullWidth
        variant="outlined"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          createAddress()
            .map(() => {
              navigate(AppRoute.Main);
            })
            .mapErr(() => {
              setLoading(false);
            });
        }}
        sx={{ mb: 1 }}
      >
        {loading ? "Creating..." : "Create"}
      </Button>
      {addresses.length > 0 && (
        <Button
          fullWidth
          variant="outlined"
          onClick={async () => {
            navigate(AppRoute.Main);
          }}
          disabled={loading}
        >
          Go back
        </Button>
      )}
    </Box>
  );
};

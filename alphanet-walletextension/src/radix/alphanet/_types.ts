export const alphanetAddresses = {
  faucet: "system_tdx_a_1qsqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqs2ufe42",
  createAccountComponent:
    "package_tdx_a_1qyqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqps373guw",
} as const;

export type ErrorResponse = {
  code: number;
  message: string;
  trace_id: string;
  error?: any;
};

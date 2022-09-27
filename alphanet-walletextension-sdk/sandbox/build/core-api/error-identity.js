export const errorIdentity = (message) => (error) => "code" in error ? error : {
  code: -1,
  message,
  trace_id: "",
  error
};

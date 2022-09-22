import { ErrorResponse } from './_types'

export const errorIdentity =
  (message: string) =>
  (error: any): ErrorResponse =>
    'code' in error
      ? error
      : {
          code: -1,
          message,
          trace_id: '',
          error,
        }

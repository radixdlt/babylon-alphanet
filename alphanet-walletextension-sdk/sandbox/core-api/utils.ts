import { err, ok, ResultAsync } from "neverthrow";

export const fromResponse = <T>(response: Response) =>
  ResultAsync.fromPromise(response.text(), (error) => error as Error)
    .andThen((text) => {
      try {
        return ok(JSON.parse(text));
      } catch (error) {
        return err({
          code: response.status,
          url: response.url,
          message: `Could not fetch data from API (status ${response.status})`,
          error,
        });
      }
    })
    .map((data: T) => ({ data, status: response.status, url: response.url }));

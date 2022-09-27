import {err, ok, ResultAsync} from "../_snowpack/pkg/neverthrow.js";
export const fromResponse = (response) => ResultAsync.fromPromise(response.text(), (error) => error).andThen((text) => {
  try {
    return ok(JSON.parse(text));
  } catch (error) {
    return err({
      code: response.status,
      url: response.url,
      message: `Could not fetch data from API (status ${response.status})`,
      error
    });
  }
}).map((data) => ({data, status: response.status, url: response.url}));

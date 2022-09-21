import { ResultAsync } from "neverthrow";

export const store = {
  getItem: <T>(key: string, defaultValue?: T) =>
    ResultAsync.fromPromise(
      chrome.storage.local.get(key),
      (error) => error as Error
    ).map((result): T => result[key] || defaultValue),
  setItem: (item: Record<string, any>) =>
    ResultAsync.fromPromise(
      chrome.storage.local.set(item),
      (error) => error as Error
    ),
} as const;

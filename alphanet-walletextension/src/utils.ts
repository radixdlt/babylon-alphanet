import { err, ok, Result } from "neverthrow";

export function hexStringFromByteArray(byteArray: Uint8Array): string {
  return [...new Uint8Array(byteArray)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function byteArrayFromHex(hex: string): Uint8Array {
  return Uint8Array.from(
    hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  );
}

export const parseJSON = <T = Record<string, any>, E = Error>(
  text: string
): Result<T, E> => {
  try {
    return ok(JSON.parse(text));
  } catch (error) {
    return err(error as E);
  }
};

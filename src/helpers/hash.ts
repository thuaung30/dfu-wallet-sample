import { sha3 } from "web3-utils";

export function getUniqueEventID(
  txHash: string,
  eventType: string,
  accountAddress: string
): string | null {
  return sha3(txHash.toLowerCase() + eventType + accountAddress.toLowerCase());
}

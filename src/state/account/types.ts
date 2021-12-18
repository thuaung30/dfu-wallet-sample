import { Address } from "../types";

export type WalletCredentials = {
  address: Address;
  type: string;
  meta: {
    signingKey: {
      privateKey: string;
      mnemonic: string;
    };
  };
};

export type Account = {
  address: Address;
  walletCredentials: WalletCredentials;
  selectedNetworkAddress?: Address | null;
};

export type AccountsNormalized = {
  [address: string]: Account;
};

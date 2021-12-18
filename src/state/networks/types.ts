export type Currency = {
  address: string;
  abbreviation: string;
  name: string;
  decimals: number;
  [key: string]: any;
};

export type Network = Currency & {
  numUsers: number;
  isFrozen: boolean;
  interestRateDecimals: number;
  defaultInterestRate: number;
  customInterests: boolean;
};

export type Networks = Network[];

export type NetworksNormalized = {
  [address: string]: Network;
};

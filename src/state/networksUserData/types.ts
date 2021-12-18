export type NetworkUserData = {
  networkAddress: string;
  accountAddress: string;
  balance: string | number;
  frozenBalance: string | number;
  given: string | number;
  received: string | number;
  leftGiven: string | number;
  leftReceived: string | number;
};

export type NetworksUserDataNormalized = {
  [networkAddress: string]: NetworkUserData;
};

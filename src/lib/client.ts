import { TLNetwork } from "@trustlines/trustlines-clientlib";
import {
  TLOptions,
  TLWalletData,
  TxOptions,
} from "@trustlines/trustlines-clientlib/lib-esm/typings";
import { clientlibConfig, LOG, __DEV__ } from "../config";
import { rejectAfterTimeout } from "../helpers/async";
import { Address } from "../state/types";

export type Amount = {
  value: string;
  raw: string;
  decimals: number;
};

export type NetworkFromLib = {
  name: string;
  abbreviation: string;
  address: string;
  decimals: number;
  numUsers: number;
  defaultInterestRate: Amount;
  interestRateDecimals: number;
  customInterests: boolean;
  preventMediatorInterests: boolean;
  isFrozen: boolean;
};

export type NetworkUserDataFromLib = {
  balance: Amount;
  frozenBalance: Amount;
  given: Amount;
  received: Amount;
  leftGiven: Amount;
  leftReceived: Amount;
};

const TL: TLNetwork = new TLNetwork(clientlibConfig);

/**
 * Account based methods
 */
export const createCredentials = (): any => {
  __DEV__ && LOG && console.log("ClientLib", "createAccount");

  return TL.user.create();
};

export const deployIdentity = (walletCredentials: TLWalletData): any => {
  __DEV__ && LOG && console.log("ClientLib", "deployIdentity");

  return loadAccount(walletCredentials).then(() => {
    return TL.user.deployIdentity();
  });
};

export const isIdentityDeployed = (walletCredentials: TLWalletData): any => {
  __DEV__ && LOG && console.log("ClientLib", "isIdentityDeployed");

  return loadAccount(walletCredentials).then(() => {
    return TL.user.isIdentityDeployed();
  });
};

export const loadAccount = (walletCredentials: TLWalletData): any => {
  __DEV__ && LOG && console.log("ClientLib", "loadAccount");

  return TL.user.loadFrom(walletCredentials);
};

export const recoverCredentialsFromSeed = (seed: string): any => {
  __DEV__ && LOG && console.log("ClientLib", "recoverFromSeed");

  return TL.user.recoverFromSeed(seed);
};

export const recoverCredentialsFromPrivateKey = (key: string): any => {
  __DEV__ && LOG && console.log("ClientLib", "recoverFromPrivateKey");

  return TL.user.recoverFromPrivateKey(key);
};

export const createAccountUrl = (
  username: string,
  useUniversalLink: boolean = true
): any => {
  __DEV__ && LOG && console.log("ClientLib", "createAccountUrl");
  return TL.user.createLink({
    name: username,
  });
};

export const exportPrivateKey = async (): Promise<string> => {
  return await TL.user.exportPrivateKey();
};

export const sendPayment = async (
  networkAddress: string,
  receiverAddress: string,
  value: string | number
) => {
  const { rawTx, maxFees, path, feePayer } = await TL.payment.prepare(
    networkAddress,
    receiverAddress,
    value
  );
  __DEV__ && console.log("Transfer path:", path);
  __DEV__ && console.log("Network fees:", maxFees);
  __DEV__ && console.log("Fee payer:", feePayer);

  const txHash = await TL.payment.confirmPayment({
    rawTx,
    receiverAddress,
  });

  __DEV__ && console.log("Transaction hash: ", txHash);
};

/**
 * Network based methods
 */
export const getAllNetworks = (): Promise<NetworkFromLib[] | Error> => {
  __DEV__ && LOG && console.log("ClientLib", "getNetworks");
  return Promise.race([
    rejectAfterTimeout(10000, "Networks"),
    TL.currencyNetwork.getAll(),
  ]);
};

export const getNetworkUserData = (
  networkAddress: Address,
  userAddress: Address
): Promise<NetworkUserDataFromLib | Error> => {
  __DEV__ && LOG && console.log("ClientLib", "getNetworkUserData");
  return Promise.race([
    rejectAfterTimeout(10000, "Network"),
    TL.currencyNetwork.getUserOverview(networkAddress, userAddress),
  ]);
};

/**
 * Trustlines chain transactions methods
 */
export const prepareTrustlineUpdate = (
  networkAddress: Address,
  contactAddress: Address,
  clGiven: number | string,
  clReceived: number | string,
  options?: TLOptions
): any => {
  __DEV__ && LOG && console.log("ClientLib", "prepareTrustlineUpdate");
  return TL.trustline.prepareUpdate(
    networkAddress,
    contactAddress,
    clGiven,
    clReceived,
    options
  );
};

export const prepareTrustlineAccept = (
  networkAddress: Address,
  contactAddress: Address,
  clGiven: string | number,
  clReceived: string | number,
  options?: TLOptions
): any => {
  __DEV__ && LOG && console.log("ClientLib", "prepareTrustlineAccept");
  return TL.trustline.prepareAccept(
    networkAddress,
    contactAddress,
    clGiven,
    clReceived,
    options
  );
};

export const prepareTrustlineCancel = (
  networkAddress: Address,
  counterpartyAddress: Address,
  options?: TxOptions
): any => {
  __DEV__ && LOG && console.log("ClientLib", "prepareTrustlineCancel");
  return TL.trustline.prepareCancelTrustlineUpdate(
    networkAddress,
    counterpartyAddress,
    options
  );
};

export const confirmTrustlineTransaction = (tx: any): Promise<any> => {
  __DEV__ && LOG && console.log("ClientLib", "confirmTrustlineTX");
  if (!tx) {
    return Promise.reject(new Error("No TX given"));
  }

  return TL.trustline.confirm(tx);
};

/**
 * Events based actions
 */
export const getEvents = (
  networkAddress: Address,
  filter: any
): Promise<any> => {
  __DEV__ && LOG && console.log("ClientLib", "getEvents");
  return Promise.race([
    rejectAfterTimeout(10000, "Events"),
    TL.event.get(networkAddress, filter),
  ]);
};

export const getEventsForAllNetworks = (filter?: any): Promise<any> => {
  __DEV__ && LOG && console.log("ClientLib", "getEventsForAllNetworks");
  return Promise.race([
    rejectAfterTimeout(20000, "Events for all Networks"),
    TL.event.getAll(filter),
  ]);
};

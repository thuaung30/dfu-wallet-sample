import assert from "assert";
import { Amount, NetworkFromLib, NetworkUserDataFromLib } from "../lib/client";

export const formatValue = (valueObject: Amount | string) => {
  if (
    valueObject &&
    Object.prototype.hasOwnProperty.call(valueObject, "value") &&
    typeof valueObject !== "string"
  ) {
    return parseFloat(valueObject.value);
  } else {
    // sanity check
    assert(typeof valueObject === "string");
    return parseFloat(valueObject);
  }
};

export function formatNetwork(network: NetworkFromLib) {
  return {
    ...network,
    name: network.name,
    numUsers: network.numUsers,
    preventMediatorInterests: network.preventMediatorInterests,
    customInterests: network.customInterests,
    isFrozen: network.isFrozen,
    decimals: network.decimals,
    address: network.address,
    interestRateDecimals: network.interestRateDecimals,
    abbreviation: network.abbreviation,
    defaultInterestRate: network.defaultInterestRate
      ? formatValue(network.defaultInterestRate)
      : 0,
  };
}

export type EnrichedNetworkUserData = NetworkUserDataFromLib & {
  accountAddress: string;
  networkAddress: string;
};

export function formatNetworkUserData(
  networkUserData: EnrichedNetworkUserData
) {
  return {
    ...networkUserData,
    networkAddress: networkUserData.networkAddress,
    accountAddress: networkUserData.accountAddress,
    balance: networkUserData.balance ? formatValue(networkUserData.balance) : 0,
    frozenBalance: networkUserData.frozenBalance
      ? formatValue(networkUserData.frozenBalance)
      : 0,
    given: networkUserData.given ? formatValue(networkUserData.given) : 0,
    received: networkUserData.received
      ? formatValue(networkUserData.received)
      : 0,
    leftGiven: networkUserData.leftGiven
      ? formatValue(networkUserData.leftGiven)
      : 0,
    leftReceived: networkUserData.leftReceived
      ? formatValue(networkUserData.leftReceived)
      : 0,
  };
}

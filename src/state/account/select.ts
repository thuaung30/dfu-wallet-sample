import { get } from "lodash";
import { createSelector } from "reselect";
import { AppState } from "../../store/rootReducer";
import { Address } from "../types";
import { AccountsNormalized } from "./types";

export const getAccount = (state: AppState, accountAddress: string) => {
  const data = get(state, "account.data", {});
  return data[accountAddress];
};

const getAccountLoading = (state: AppState): boolean =>
  get(state, "account.fetching", false);

const getAccountError = (state: AppState): Error | null =>
  get(state, "account.error", null);

export const getAccountsData = (state: AppState): AccountsNormalized =>
  get(state, "account.data", {});

export function getCurrentAccountAddress(state: AppState): Address | null {
  return get(state, "account.selectedAccountAddress", null);
}

export function getCurrentAccountSelectedNetworkAddress(
  state: AppState
): Address | null | undefined {
  const accountAddress = get(state, "account.selectedAccountAddress", null);
  return get(state, [
    "account",
    "data",
    accountAddress,
    "selectedNetworkAddress",
  ]);
}

export const getCurrentAccountSelector = createSelector(
  getCurrentAccountAddress,
  getAccountsData,
  (selectedAccountAddress, accounts) => {
    if (!!selectedAccountAddress) {
      const account = get(accounts, selectedAccountAddress);
      return account;
    }
    return {};
  }
);

export const getAccountLoadingSelector = createSelector(
  getAccountLoading,
  (loading) => loading
);

export const getAccountErrorSelector = createSelector(
  getAccountError,
  (error) => error
);

import { get } from "lodash";
import { createSelector } from "reselect";
import { AppState } from "../../store/rootReducer";
import { getCurrentAccountAddress } from "../account/select";
import { NetworksUserDataNormalized } from "./types";

const emptyObject = {};

const getNetworksUserDataLoading = (state: AppState) =>
  get(state, "networksUserData.isFetching", false);

export const getNetworksUserData = (
  state: AppState
): { [accountAddress: string]: NetworksUserDataNormalized } =>
  state.networksUserData.data;

export const getNetworksUserDataLoadingSelector = createSelector(
  [getNetworksUserDataLoading],
  (loading) => loading
);

export const getNetworksUserDataForCurrentAccountSelector = createSelector(
  [getNetworksUserData, getCurrentAccountAddress],
  (data, address) => {
    if (!address) {
      return emptyObject;
    }
    return data[address] || emptyObject;
  }
);

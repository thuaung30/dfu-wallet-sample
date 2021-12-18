import { get, keys, orderBy } from "lodash";
import { denormalize } from "normalizr";
import { createSelector } from "reselect";
import { LOG, __DEV__ } from "../../config";
import { AppState } from "../../store/rootReducer";
import { getCurrentAccountSelectedNetworkAddress } from "../account/select";
import { network } from "./schema";
import { Networks, NetworksNormalized } from "./types";

const getNetworksData = (state: AppState): NetworksNormalized =>
  get(state, "networks.data", null);

const getNetworksLoading = (state: AppState): boolean =>
  get(state, "networks.loading", false);

const getNetworksError = (state: AppState): Error | null =>
  get(state, "networks.error", null);

export const getNetworkAddresses: any = createSelector(
  getNetworksData,
  (networks) => {
    return keys(networks || {});
  }
);

export const getNetworksSelector = createSelector(
  [getNetworksData],
  (networksData) => {
    const denormalizedData = denormalize(
      { networks: keys(networksData) },
      { networks: [network] },
      { networks: networksData }
    );
    const networks = orderBy(denormalizedData.networks as Networks, ["name"]);
    return networks;
  }
);

export const getNetworkSelector = createSelector(
  [getNetworksData, getCurrentAccountSelectedNetworkAddress],
  (networksData, address) => {
    __DEV__ && LOG && console.log(address);
    if (address) return networksData[address];
    return {};
  }
);

export const getSpecificNetworkSelector = (networkAddress: string) =>
  createSelector([getNetworksData], (networks) => {
    return networks[networkAddress];
  });

export const getNetworksLoadingSelector = createSelector(
  getNetworksLoading,
  (loading) => loading
);

export const getNetworksErrorSelector = createSelector(
  getNetworksError,
  (error) => error
);

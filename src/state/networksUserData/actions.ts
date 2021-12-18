import { NetworkUserData } from "./types";

export const NETWORK_USER_DATA_FETCH_REQUEST =
  "NETWORK_USER_DATA_FETCH_REQUEST";
export const NETWORK_USER_DATA_FETCH_SUCCESS =
  "NETWORK_USER_DATA_FETCH_SUCCESS";
export const NETWORK_USER_DATA_FETCH_FAIL = "NETWORKS_USER_DATA_FETCH_FAIL";

// action types
export interface FetchNetworkUserDataRequest {
  type: typeof NETWORK_USER_DATA_FETCH_REQUEST;
  networkAddress: string;
}

export interface FetchNetworkUserDataSuccess {
  type: typeof NETWORK_USER_DATA_FETCH_SUCCESS;
  payload: {
    accountAddress: string;
    networkUserData: NetworkUserData;
  };
}

export interface FetchNetworkUserDataFail {
  type: typeof NETWORK_USER_DATA_FETCH_FAIL;
  error: Error;
}

export type Action =
  | FetchNetworkUserDataRequest
  | FetchNetworkUserDataSuccess
  | FetchNetworkUserDataFail;

export const fetchNetworkUserDataRequest = (
  networkAddress: string
): FetchNetworkUserDataRequest => {
  return {
    type: NETWORK_USER_DATA_FETCH_REQUEST,
    networkAddress,
  };
};

export const fetchNetworkUserDataSuccess = (
  accountAddress: string,
  networkUserData: NetworkUserData
): FetchNetworkUserDataSuccess => {
  return {
    type: NETWORK_USER_DATA_FETCH_SUCCESS,
    payload: {
      accountAddress,
      networkUserData,
    },
  };
};

export const fetchNetworkUserDataFail = (
  error: Error
): FetchNetworkUserDataFail => {
  return {
    type: NETWORK_USER_DATA_FETCH_FAIL,
    error,
  };
};

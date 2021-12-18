import { NetworksNormalized } from "./types";

export const NETWORKS_FETCH_ALL_REQUEST = "NETWORKS_FETCH_ALL_REQUEST";
export const NETWORKS_FETCH_ALL_SUCCESS = "NETWORKS_FETCH_ALL_SUCCESS";
export const NETWORKS_FETCH_ALL_FAIL = "NETWORKS_FETCH_ALL_FAIL";

// action types
export interface FetchAllNetworksRequest {
  type: typeof NETWORKS_FETCH_ALL_REQUEST;
}

export interface FetchAllNetworksSuccess {
  type: typeof NETWORKS_FETCH_ALL_SUCCESS;
  payload: NetworksNormalized;
}

export interface FetchAllNetworksFail {
  type: typeof NETWORKS_FETCH_ALL_FAIL;
  error: Error;
}

export type Action =
  | FetchAllNetworksRequest
  | FetchAllNetworksSuccess
  | FetchAllNetworksFail;

export const fetchAllNetworksRequest = (): FetchAllNetworksRequest => {
  return {
    type: NETWORKS_FETCH_ALL_REQUEST,
  };
};

export const fetchAllNetworksSuccess = (
  payload: NetworksNormalized
): FetchAllNetworksSuccess => {
  return {
    type: NETWORKS_FETCH_ALL_SUCCESS,
    payload,
  };
};

export const fetchAllNetworksFail = (error: Error): FetchAllNetworksFail => {
  return {
    type: NETWORKS_FETCH_ALL_FAIL,
    error,
  };
};

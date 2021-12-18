import { isEqual } from "lodash";
import { Reducer } from "redux";
import {
  Action,
  NETWORKS_FETCH_ALL_FAIL,
  NETWORKS_FETCH_ALL_REQUEST,
  NETWORKS_FETCH_ALL_SUCCESS,
} from "./actions";
import { NetworksNormalized } from "./types";

export type NetworksState = {
  data: NetworksNormalized;
  loading: boolean;
  error: Error | null;
};

const initialState: NetworksState = {
  data: {},
  loading: false,
  error: null,
};

export const reducer: Reducer<NetworksState, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case NETWORKS_FETCH_ALL_SUCCESS:
      const networks = action.payload;
      if (isEqual(networks, state.data)) {
        return {
          ...state,
          loading: false,
        };
      }
      return {
        data: networks,
        loading: false,
        error: null,
      };
    case NETWORKS_FETCH_ALL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case NETWORKS_FETCH_ALL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

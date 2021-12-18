import { Reducer } from "redux";
import {
  Action,
  NETWORK_USER_DATA_FETCH_FAIL,
  NETWORK_USER_DATA_FETCH_REQUEST,
  NETWORK_USER_DATA_FETCH_SUCCESS,
} from "./actions";
import { NetworksUserDataNormalized } from "./types";

export type NetworksUserDataState = {
  data: {
    [accountAddress: string]: NetworksUserDataNormalized;
  };
  isFetching: boolean;
  error: Error | null;
};

export const initialState: NetworksUserDataState = {
  data: {},
  isFetching: false,
  error: null,
};

export const reducer: Reducer<NetworksUserDataState, Action> = (
  state: NetworksUserDataState = initialState,
  action
) => {
  switch (action.type) {
    case NETWORK_USER_DATA_FETCH_SUCCESS:
      const { accountAddress, networkUserData } = action.payload;
      return {
        isFetching: false,
        error: null,
        data: {
          ...state.data,
          [accountAddress]: {
            ...state.data[accountAddress],
            [networkUserData.networkAddress]: {
              ...networkUserData,
            },
          },
        },
      };
    case NETWORK_USER_DATA_FETCH_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case NETWORK_USER_DATA_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    default:
      return state;
  }
};

import { get, isEqual } from "lodash";
import { Reducer } from "redux";
import { Address } from "../types";
import {
  ACCOUNT_CREATE_FAIL,
  ACCOUNT_CREATE_REQUEST,
  ACCOUNT_CREATE_SUCCESS,
  ACCOUNT_LOAD_FAIL,
  ACCOUNT_LOAD_REQUEST,
  ACCOUNT_LOAD_SUCCESS,
  ACCOUNT_LOGOUT_FAIL,
  ACCOUNT_LOGOUT_REQUEST,
  ACCOUNT_LOGOUT_SUCCESS,
  ACCOUNT_RECOVER_FAIL,
  ACCOUNT_RECOVER_REQUEST,
  ACCOUNT_RECOVER_SUCCESS,
  ACCOUNT_SELECT_CURRENCY,
  Action,
} from "./actions";
import { Account, AccountsNormalized } from "./types";

export type AccountState = {
  data: AccountsNormalized;
  selectedAccountAddress: Address | null;
  fetching: boolean;
  error: Error | null;
};

const initialState: AccountState = {
  data: {},
  selectedAccountAddress: null,
  fetching: false,
  error: null,
};

const isAccountInStateEqual = (state: AccountState, account: Account) => {
  const accountInState = get(state.data, account.address);

  if (isEqual(accountInState, account)) {
    return true;
  }

  return false;
};

export const reducer: Reducer<AccountState, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ACCOUNT_SELECT_CURRENCY:
      const { accountAddress, currencyAddress } = action.payload;
      if (!currencyAddress || !accountAddress) {
        return state;
      }

      const prevAccount = state.data[accountAddress];

      if (!prevAccount) {
        return state;
      }

      return {
        ...state,
        data: {
          ...state.data,
          [accountAddress]: {
            ...prevAccount,
            selectedNetworkAddress: currencyAddress,
          },
        },
      };
    case ACCOUNT_CREATE_SUCCESS:
    case ACCOUNT_RECOVER_SUCCESS:
      const account = action.account;

      if (isAccountInStateEqual(state, account)) {
        return {
          ...state,
          selectedAccountAddress: account.address,
          fetching: false,
        };
      }

      return {
        ...state,
        data: {
          ...state.data,
          [account.address]: account,
        },
        selectedAccountAddress: account.address,
        fetching: false,
      };
    case ACCOUNT_LOAD_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
      };
    case ACCOUNT_LOGOUT_SUCCESS:
      return {
        ...state,
        selectedAccountAddress: null,
        fetching: false,
        error: null,
      };
    case ACCOUNT_CREATE_FAIL:
    case ACCOUNT_RECOVER_FAIL:
    case ACCOUNT_LOAD_FAIL:
    case ACCOUNT_LOGOUT_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case ACCOUNT_CREATE_REQUEST:
    case ACCOUNT_RECOVER_REQUEST:
    case ACCOUNT_LOAD_REQUEST:
    case ACCOUNT_LOGOUT_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    default:
      return state;
  }
};

import { Account } from "./types";

export const ACCOUNT_CREATE_REQUEST = "ACCOUNT_CREATE_REQUEST";
export const ACCOUNT_CREATE_SUCCESS = "ACCOUNT_CREATE_SUCCESS";
export const ACCOUNT_CREATE_FAIL = "ACCOUNT_CREATE_FAIL";

export const ACCOUNT_RECOVER_REQUEST = "ACCOUNT_RECOVER_REQUEST";
export const ACCOUNT_RECOVER_SUCCESS = "ACCOUNT_RECOVER_SUCCESS";
export const ACCOUNT_RECOVER_FAIL = "ACCOUNT_RECOVER_FAIL";

export const ACCOUNT_PERSIST_REQUEST = "ACCOUNT_PERSIST_REQUEST";
export const ACCOUNT_PERSIST_SUCCESS = "ACCOUNT_PERSIST_SUCCESS";
export const ACCOUNT_PERSIST_FAIL = "ACCOUNT_PERSIST_FAIL";

export const ACCOUNT_LOAD_REQUEST = "ACCOUNT_LOAD_REQUEST";
export const ACCOUNT_LOAD_SUCCESS = "ACCOUNT_LOAD_SUCCESS";
export const ACCOUNT_LOAD_FAIL = "ACCOUNT_LOAD_FAIL";

export const ACCOUNT_LOGOUT_REQUEST = "ACCOUNT_LOGOUT_REQUEST";
export const ACCOUNT_LOGOUT_SUCCESS = "ACCOUNT_LOGOUT_SUCCESS";
export const ACCOUNT_LOGOUT_FAIL = "ACCOUNT_LOGOUT_FAIL";

export const ACCOUNT_SELECT_CURRENCY = "ACCOUNT_SELECT_CURRENCY";

// action types
export interface CreateAccountRequest {
  type: typeof ACCOUNT_CREATE_REQUEST;
}

export interface CreateAccountSuccess {
  type: typeof ACCOUNT_CREATE_SUCCESS;
  account: Account;
}

export interface CreateAccountFail {
  type: typeof ACCOUNT_CREATE_FAIL;
  error: Error;
}

export interface RecoverAccountRequest {
  type: typeof ACCOUNT_RECOVER_REQUEST;
  privateKey: string;
}

export interface RecoverAccountSuccess {
  type: typeof ACCOUNT_RECOVER_SUCCESS;
  account: Account;
}

export interface RecoverAccountFail {
  type: typeof ACCOUNT_RECOVER_FAIL;
  error: Error;
}

export interface LoadAccountRequest {
  type: typeof ACCOUNT_LOAD_REQUEST;
}

export interface LoadAccountSuccess {
  type: typeof ACCOUNT_LOAD_SUCCESS;
}

export interface LoadAccountFail {
  type: typeof ACCOUNT_LOAD_FAIL;
  error: Error;
}

export interface LogoutAccountRequest {
  type: typeof ACCOUNT_LOGOUT_REQUEST;
}

export interface LogoutAccountSuccess {
  type: typeof ACCOUNT_LOGOUT_SUCCESS;
}

export interface LogoutAccountFail {
  type: typeof ACCOUNT_LOGOUT_FAIL;
  error: Error;
}

export interface LoadAccountRequest {
  type: typeof ACCOUNT_LOAD_REQUEST;
}

export interface SelectAccountCurrency {
  type: typeof ACCOUNT_SELECT_CURRENCY;
  payload: {
    accountAddress: string;
    currencyAddress: string;
  };
}

export type Action =
  | CreateAccountRequest
  | CreateAccountSuccess
  | CreateAccountFail
  | RecoverAccountRequest
  | RecoverAccountSuccess
  | RecoverAccountFail
  | LoadAccountRequest
  | LoadAccountSuccess
  | LoadAccountFail
  | LogoutAccountRequest
  | LogoutAccountSuccess
  | LogoutAccountFail
  | SelectAccountCurrency;

export const createAccountRequest = (): CreateAccountRequest => {
  return {
    type: ACCOUNT_CREATE_REQUEST,
  };
};

export const createAccountSuccess = (
  account: Account
): CreateAccountSuccess => {
  return {
    type: ACCOUNT_CREATE_SUCCESS,
    account,
  };
};

export const createAccountFail = (error: Error): CreateAccountFail => {
  return {
    type: ACCOUNT_CREATE_FAIL,
    error,
  };
};

export const recoverAccountRequest = (
  privateKey: string
): RecoverAccountRequest => {
  return {
    type: ACCOUNT_RECOVER_REQUEST,
    privateKey,
  };
};

export const recoverAccountSuccess = (
  account: Account
): RecoverAccountSuccess => {
  return {
    type: ACCOUNT_RECOVER_SUCCESS,
    account,
  };
};

export const recoverAccountFail = (error: Error): RecoverAccountFail => {
  return {
    type: ACCOUNT_RECOVER_FAIL,
    error,
  };
};

export const loadAccountRequest = (): LoadAccountRequest => {
  return {
    type: ACCOUNT_LOAD_REQUEST,
  };
};

export const loadAccountSuccess = (): LoadAccountSuccess => {
  return {
    type: ACCOUNT_LOAD_SUCCESS,
  };
};

export const loadAccountFail = (error: Error): LoadAccountFail => {
  return {
    type: ACCOUNT_LOAD_FAIL,
    error,
  };
};

export const logoutAccountRequest = (): LogoutAccountRequest => {
  return {
    type: ACCOUNT_LOGOUT_REQUEST,
  };
};

export const logoutAccountSuccess = (): LogoutAccountSuccess => {
  return {
    type: ACCOUNT_LOGOUT_SUCCESS,
  };
};

export const logoutAccountFail = (error: Error): LogoutAccountFail => {
  return {
    type: ACCOUNT_LOGOUT_FAIL,
    error,
  };
};

export const selectCurrency = (
  accountAddress: string,
  currencyAddress: string
): SelectAccountCurrency => {
  return {
    type: ACCOUNT_SELECT_CURRENCY,
    payload: {
      accountAddress,
      currencyAddress,
    },
  };
};

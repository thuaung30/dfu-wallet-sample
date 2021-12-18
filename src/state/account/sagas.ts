import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  ACCOUNT_CREATE_REQUEST,
  ACCOUNT_LOAD_REQUEST,
  ACCOUNT_LOGOUT_REQUEST,
  ACCOUNT_RECOVER_REQUEST,
  createAccountFail,
  CreateAccountRequest,
  createAccountSuccess,
  loadAccountFail,
  LoadAccountRequest,
  loadAccountSuccess,
  logoutAccountFail,
  LogoutAccountRequest,
  logoutAccountSuccess,
  recoverAccountFail,
  RecoverAccountRequest,
  recoverAccountSuccess,
} from "./actions";
import * as client from "../../lib/client";
import { Account, WalletCredentials } from "./types";
import { TLWalletData } from "@trustlines/trustlines-clientlib/lib-esm/typings";
import { __DEV__ } from "../../config";
import { getCurrentAccountSelector } from "./select";

function* handleCreateAccountRequest(action: CreateAccountRequest) {
  try {
    const credentials: WalletCredentials = yield call(client.createCredentials);
    yield call(client.deployIdentity, credentials as TLWalletData);
    const account = {
      address: credentials.address,
      walletCredentials: credentials,
    };
    yield put(createAccountSuccess(account));
  } catch (err) {
    if (err instanceof Error) {
      yield put(createAccountFail(err));
    }
  }
}

function* handleRecoverAccountRequest(action: RecoverAccountRequest) {
  try {
    const privateKey = action.privateKey;
    __DEV__ && console.log(privateKey);
    const credentials: WalletCredentials = yield call(
      client.recoverCredentialsFromPrivateKey,
      privateKey as string
    );
    yield call(client.loadAccount, credentials as TLWalletData);
    const account = {
      address: credentials.address,
      walletCredentials: credentials,
    };
    yield put(recoverAccountSuccess(account));
  } catch (err) {
    if (err instanceof Error) {
      yield put(recoverAccountFail(err));
    }
  }
}

function* handleLoadAccount(action: LoadAccountRequest) {
  try {
    const accountToLoad: Account = yield select(getCurrentAccountSelector);

    yield call(
      client.loadAccount,
      accountToLoad.walletCredentials as TLWalletData
    );
    yield put(loadAccountSuccess());
  } catch (err) {
    if (err instanceof Error) {
      yield put(loadAccountFail(err));
    }
  }
}

function* handleLogoutAccount(action: LogoutAccountRequest) {
  try {
    yield put(logoutAccountSuccess());
  } catch (err) {
    if (err instanceof Error) {
      yield put(logoutAccountFail(err));
    }
  }
}

export default function* saga() {
  yield takeLatest(ACCOUNT_CREATE_REQUEST, handleCreateAccountRequest);
  yield takeLatest(ACCOUNT_RECOVER_REQUEST, handleRecoverAccountRequest);
  yield takeLatest(ACCOUNT_LOAD_REQUEST, handleLoadAccount);
  yield takeLatest(ACCOUNT_LOGOUT_REQUEST, handleLogoutAccount);
}

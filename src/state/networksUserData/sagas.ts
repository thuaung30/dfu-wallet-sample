import { call, cancel, put, select, takeLatest } from "redux-saga/effects";
import { getCurrentAccountAddress } from "../account/select";
import { Address } from "../types";
import {
  fetchNetworkUserDataFail,
  FetchNetworkUserDataRequest,
  fetchNetworkUserDataSuccess,
  NETWORK_USER_DATA_FETCH_REQUEST,
} from "./actions";
import * as client from "../../lib/client";
import { NetworkUserDataFromLib } from "../../lib/client";
import { normalize } from "normalizr";
import { networksUserData as networksUserDataSchema } from "./schema";

function* handleFetchNetworkUserData(action: FetchNetworkUserDataRequest) {
  try {
    const networkAddress = action.networkAddress;
    const currentAccountAddress: Address = yield select(
      getCurrentAccountAddress
    );

    if (!networkAddress || !currentAccountAddress) {
      yield cancel();
    }

    const networkUserDataFromLib: NetworkUserDataFromLib = yield call(
      client.getNetworkUserData,
      networkAddress,
      currentAccountAddress
    );
    const enrichedNetworkUserData = {
      ...networkUserDataFromLib,
      networkAddress,
      accountAddress: currentAccountAddress,
    };

    const { networksUserData } = normalize(
      enrichedNetworkUserData,
      networksUserDataSchema
    ).entities;

    if (!networksUserData) yield cancel();

    if (!!networksUserData) {
      yield put(
        fetchNetworkUserDataSuccess(
          currentAccountAddress,
          networksUserData[networkAddress]
        )
      );
    }
  } catch (err) {
    if (err instanceof Error) {
      fetchNetworkUserDataFail(err);
    }
  }
}

export default function* saga() {
  yield takeLatest(NETWORK_USER_DATA_FETCH_REQUEST, handleFetchNetworkUserData);
}

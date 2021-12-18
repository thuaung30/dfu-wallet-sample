import { call, putResolve, takeLatest } from "redux-saga/effects";
import { fetchAllNetworksFail, NETWORKS_FETCH_ALL_REQUEST } from "./actions";
import * as client from "../../lib/client";
import { network as networkDataSchema } from "./schema";
import { normalize } from "normalizr";
import * as networksActions from "./actions";
import { NetworksNormalized } from "./types";

function* handlefetchAllNetworksRequest() {
  try {
    const allNetworks: client.NetworkFromLib[] = yield call(
      client.getAllNetworks
    );
    const { networks } = normalize(allNetworks, [networkDataSchema]).entities;
    yield putResolve(
      networksActions.fetchAllNetworksSuccess(networks as NetworksNormalized)
    );
  } catch (err) {
    if (err instanceof Error) {
      fetchAllNetworksFail(err);
    }
  }
}

export default function* saga() {
  yield takeLatest(NETWORKS_FETCH_ALL_REQUEST, handlefetchAllNetworksRequest);
}

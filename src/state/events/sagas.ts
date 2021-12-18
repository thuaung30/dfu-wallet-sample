import { call, putResolve, takeLatest } from "redux-saga/effects";
import {
  EVENTS_ALL_NETWORK_FETCH_REQUEST,
  fetchEventsInAllNetworksFail,
  FetchEventsInAllNetworksRequest,
  fetchEventsInAllNetworksSuccess,
} from "./actions";
import * as client from "../../lib/client";
import { normalize } from "normalizr";
import { event as eventSchema } from "./schema";
import { formatEventFromLib } from "../../helpers/events";
import { EventFromLib } from "./types";

export function* handleFetchEventsInAllNetworks(
  action: FetchEventsInAllNetworksRequest
) {
  try {
    // const latestBlock: number | undefined = yield select(getLatestBlock);

    // const filter = {
    //   fromBlock: latestBlock,
    //   type: action.type,
    // };

    const eventsFromLib: EventFromLib[] = yield call(
      client.getEventsForAllNetworks
    );

    const formattedEventsFromLib = eventsFromLib.map(formatEventFromLib);

    const { events } = normalize(formattedEventsFromLib, [
      eventSchema,
    ]).entities;

    yield putResolve(fetchEventsInAllNetworksSuccess(events));
  } catch (err) {
    if (err instanceof Error)
      yield putResolve(fetchEventsInAllNetworksFail(err));
  }
}

export default function* saga() {
  yield takeLatest(
    EVENTS_ALL_NETWORK_FETCH_REQUEST,
    handleFetchEventsInAllNetworks
  );
}

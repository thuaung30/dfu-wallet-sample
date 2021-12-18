import { AnyNormalizedEvent } from "./types";

export const EVENTS_ALL_NETWORK_FETCH_REQUEST =
  "EVENTS_ALL_NETWORK_FETCH_REQUEST";
export const EVENTS_ALL_NETWORK_FETCH_SUCCESS =
  "EVENTS_ALL_NETWORK_FETCH_SUCCESS";
export const EVENTS_ALL_NETWORK_FETCH_FAIL = "EVENTS_ALL_NETWORK_FETCH_FAIL";

// action types
export interface FetchEventsInAllNetworksRequest {
  type: typeof EVENTS_ALL_NETWORK_FETCH_REQUEST;
}

export interface FetchEventsInAllNetworksSuccess {
  type: typeof EVENTS_ALL_NETWORK_FETCH_SUCCESS;
  payload: {
    events: {
      [eventId: string]: AnyNormalizedEvent;
    };
  };
}

export interface FetchEventsInAllNetworksFail {
  type: typeof EVENTS_ALL_NETWORK_FETCH_FAIL;
  error: Error;
}

export type Action =
  | FetchEventsInAllNetworksRequest
  | FetchEventsInAllNetworksSuccess
  | FetchEventsInAllNetworksFail;

export const fetchEventsInAllNetworksRequest =
  (): FetchEventsInAllNetworksRequest => {
    return {
      type: EVENTS_ALL_NETWORK_FETCH_REQUEST,
    };
  };

export const fetchEventsInAllNetworksSuccess = (events: {
  [eventId: string]: AnyNormalizedEvent;
}): FetchEventsInAllNetworksSuccess => {
  return {
    type: EVENTS_ALL_NETWORK_FETCH_SUCCESS,
    payload: {
      events,
    },
  };
};

export const fetchEventsInAllNetworksFail = (
  error: Error
): FetchEventsInAllNetworksFail => {
  return {
    type: EVENTS_ALL_NETWORK_FETCH_FAIL,
    error,
  };
};

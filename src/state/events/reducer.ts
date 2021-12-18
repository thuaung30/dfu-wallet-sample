import { isEmpty, isEqual, merge } from "lodash";
import { Reducer } from "redux";
import {
  Action,
  EVENTS_ALL_NETWORK_FETCH_FAIL,
  EVENTS_ALL_NETWORK_FETCH_REQUEST,
  EVENTS_ALL_NETWORK_FETCH_SUCCESS,
} from "./actions";
import { AnyNormalizedEvent } from "./types";

export type EventsState = {
  data: {
    [eventId: string]: AnyNormalizedEvent;
  };
  fetching: boolean;
  error: Error | null;
};

const initialState: EventsState = {
  data: {},
  fetching: false,
  error: null,
};

export const reducer: Reducer<EventsState, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case EVENTS_ALL_NETWORK_FETCH_SUCCESS:
      const payload = action.payload;
      if (isEmpty(payload)) return state;

      const mergedEvents = merge({}, state.data, action.payload.events);

      if (isEqual(state.data, mergedEvents)) {
        return state;
      }

      return {
        data: mergedEvents,
        fetching: false,
        error: null,
      };
    case EVENTS_ALL_NETWORK_FETCH_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case EVENTS_ALL_NETWORK_FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    default:
      return state;
  }
};

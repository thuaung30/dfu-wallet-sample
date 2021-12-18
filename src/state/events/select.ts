import { get, indexOf, isEmpty, keys, reduce } from "lodash";
import { denormalize } from "normalizr";
import { createSelector } from "reselect";
import { AppState } from "../../store/rootReducer";
import { getCurrentAccountSelector } from "../account/select";
import { getNetworkAddresses, getNetworksSelector } from "../networks/select";
import {
  AnyNormalizedEvent,
  NormalizedTransferEvent,
  NormalizedTrustlineUpdateEvent,
  NormalizedTrustlineUpdateRequestEvent,
} from "./types";
import { event as eventsSchema } from "./schema";
import {
  enrichEvents,
  findNearestTrustlineUpdateEvent,
  groupEvents,
  sortEvents,
} from "../../helpers/events";
import { Account } from "../account/types";

export const getIsLoading = (state: AppState): boolean =>
  get(state, "events.fetching", false);

export const getEventsData = (
  state: AppState
): { [eventId: string]: AnyNormalizedEvent } => state.events.data;

const emptyArray: any[] = [];

export const getEventSelector = (key: string) =>
  createSelector(getEventsData, (events) => {
    const event = events[key];
    if (event.type === "TrustlineUpdate") {
      return event as NormalizedTrustlineUpdateEvent;
    } else if (event.type === "TrustlineUpdateRequest") {
      return event as NormalizedTrustlineUpdateRequestEvent;
    } else {
      return event as NormalizedTransferEvent;
    }
  });

export const getEvents = createSelector(
  getCurrentAccountSelector,
  getEventsData,
  getNetworksSelector,
  (account, events, networks) => {
    if (!account) return emptyArray;
    const denormalizedData = denormalize(
      { events: keys(events) },
      { events: [eventsSchema] },
      {
        events: events,
        networks: networks,
      }
    );
    const denormalizedEvents = denormalizedData.events;

    if (!denormalizedEvents.length) {
      return emptyArray;
    }

    return sortEvents(denormalizedEvents);
  }
);

export const getEventsOfCurrentAccount: any = createSelector(
  getCurrentAccountSelector,
  getEvents,
  getNetworkAddresses,
  (currentAccount, events, networkAddresses) => {
    if (!currentAccount) {
      return emptyArray;
    }

    const eventsOfCurrentAccount = events.filter(
      (event) =>
        event.accountAddress === (currentAccount as Account).address &&
        networkAddresses.includes(event.networkAddress)
    );

    if (!eventsOfCurrentAccount.length) {
      return emptyArray;
    }

    return eventsOfCurrentAccount;
  }
);

export const getEnrichedEvents: any = createSelector(
  [getEventsOfCurrentAccount],
  (events) => {
    return enrichEvents(events);
  }
);

export const getGroupedEvents: any = createSelector(
  getEnrichedEvents,
  (events) => {
    return groupEvents(events);
  }
);

export const getLatestBlock = (state: AppState): undefined | number => {
  return reduce(
    getEventsOfCurrentAccount(state),
    (carry = 0, event: any) => {
      if (event.processingStatus === "confirmed") {
        return Math.max(carry, event.blockNumber - 1);
      }
      return undefined;
    },
    0
  );
};

export const getSlicedEventsForDashboard = createSelector(
  getEnrichedEvents,
  (events) => {
    if (!events.length) return emptyArray;
    return events.slice(0, 5);
  }
);

export const getTrustlineUpdateOfCurrentRequest = (event: any) =>
  createSelector(getEvents, (events) => {
    const index = indexOf(events, event);
    const result = findNearestTrustlineUpdateEvent(
      events.slice(0, index),
      event
    );
    if (isEmpty(result)) return {};
    return result;
  });

import { groupBy, orderBy, pick } from "lodash";
import {
  AnyEnrichedEvent,
  EventFromLib,
  NormalizedEvent,
  Event,
} from "../state/events/types";
import { getUniqueEventID } from "./hash";
import { formatValue } from "./numbers";

export type SortDirection = "asc" | "desc";

export function groupEvents(events: Array<Event>) {
  const groupedEvents = groupBy(events, (event: Event) => {
    return getGroupName(event);
  });
  return enrichGroupedEvents(groupedEvents);
}

function getGroupName(event: Event) {
  if (event.type === "PaymentRequest" && event.billId) {
    return ["SplitBillRequest", event.billId].join("-");
  }

  return event.id;
}

function enrichGroupedEvents(groupedEvents: {
  [groupName: string]: Array<Event>;
}) {
  return Object.keys(groupedEvents).map((groupName) => {
    const eventsOfGroup = groupedEvents[groupName];
    const mergedEventIds = eventsOfGroup.map((event) => event.id);

    const enrichedFirstEventOfGroup = {
      ...eventsOfGroup[0],
      mergedEventIds,
    };

    if (groupName.startsWith("SplitBillRequest")) {
      const [, billId] = groupName.split("-", 2);
      return {
        ...enrichedFirstEventOfGroup,
        type: "SplitBillRequest",
        billId,
      };
    }

    return enrichedFirstEventOfGroup;
  });
}

export const sortEvents = (
  events: Array<AnyEnrichedEvent>,
  sortDirection: SortDirection = "desc"
): Array<Event> => {
  return orderBy<Event>(
    events,
    ["timestamp", "blockNumber", "logIndex"],
    [sortDirection, sortDirection, sortDirection]
  );
};

export function formatEventFromLib(
  eventFromLib: EventFromLib
): NormalizedEvent {
  const event = {
    ...eventFromLib,
    id: getUniqueEventID(
      eventFromLib.transactionHash,
      eventFromLib.type,
      eventFromLib.user
    ),
    accountAddress: eventFromLib.user,
    processingStatus: eventFromLib.status,
    account: eventFromLib.user,
    contact: eventFromLib.counterParty,
    network: eventFromLib.networkAddress,
    status: null,
  };

  for (const key of Object.keys(event)) {
    if (
      [
        "amount",
        "given",
        "received",
        "interestRateGiven",
        "interestRateReceived",
      ].includes(key)
    ) {
      event[key] = formatValue(event[key]);
    }
  }

  return event;
}

export const enrichEvents = (events: Array<Event>): Array<AnyEnrichedEvent> => {
  return events.map((event, eventIndex) => {
    const enrichedEvent = {
      ...event,
    };

    if (event.type === "TrustlineUpdateCancel") {
      const originalRequest = findOriginalRequestOfTrustlineUpdateCancel(
        events.slice(eventIndex + 1, events.length),
        event
      );
      return {
        ...enrichedEvent,
        ...pick(
          originalRequest,
          "amount",
          "given",
          "interestRateGiven",
          "interestRateReceived",
          "received"
        ),
        originalRequestDirection: originalRequest?.direction,
      };
    }

    // $FlowFixMe
    return enrichedEvent;
  });
};

export function findOriginalRequestOfTrustlineUpdateCancel(
  olderEvents: Event[],
  cancelEvent: any
): undefined | Event {
  return olderEvents.find(
    (event) =>
      event.type === "TrustlineUpdateRequest" &&
      event.counterParty === cancelEvent.counterParty &&
      event.networkAddress === cancelEvent.networkAddress
  );
}

export function findNearestTrustlineUpdateEvent(
  newerEvents: any[],
  requestEvent: any
): any {
  return newerEvents.find(
    (event) =>
      event.type === "TrustlineUpdate" &&
      event.counterParty === requestEvent.counterParty &&
      event.networkAddress === requestEvent.networkAddress &&
      event.given === requestEvent.given &&
      event.received === requestEvent.received
  );
}

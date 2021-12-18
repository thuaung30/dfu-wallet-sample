import { schema } from "normalizr";
import { getUniqueEventID } from "../../helpers/hash";
import { network } from "../networks/schema";
import { AnyNormalizedEvent } from "./types";

export const event: schema.Entity<AnyNormalizedEvent> = new schema.Entity(
  "events",
  {
    network: network,
  },
  {
    idAttribute: (entity) => getEventID(entity),
    processStrategy: (entity) => ({
      ...entity,
      id: getEventID(entity),
    }),
  }
);

function getEventID(event: any) {
  if (event.id) {
    return event.id;
  }

  return getUniqueEventID(event.transactionHash, event.type, event.user);
}

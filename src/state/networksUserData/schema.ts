import { schema } from "normalizr";
import { formatNetworkUserData } from "../../helpers/numbers";

export const networksUserData = new schema.Entity(
  "networksUserData",
  {},
  {
    idAttribute: "networkAddress",
    processStrategy: (entity) => formatNetworkUserData(entity),
  }
);

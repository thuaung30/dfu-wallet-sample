import { schema } from "normalizr";
import { formatNetwork } from "../../helpers/numbers";

export const network = new schema.Entity(
  "networks",
  {},
  {
    idAttribute: "address",
    processStrategy: (entity) => formatNetwork(entity),
  }
);

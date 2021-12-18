import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import TransferCard from "../components/event/TransferCard";
import TrustlineUpdateCard from "../components/event/TrustlineUpdateCard";
import TrustlineUpdateRequestCard from "../components/event/TrustlineUpdateRequestCard";
import { getEventSelector } from "../state/events/select";
import {
  NormalizedTransferEvent,
  NormalizedTrustlineUpdateEvent,
  NormalizedTrustlineUpdateRequestEvent,
} from "../state/events/types";
import { getSpecificNetworkSelector } from "../state/networks/select";

const Event: React.FC = () => {
  const { id } = useParams();
  const event = useSelector(getEventSelector(id));
  const network = useSelector(getSpecificNetworkSelector(event.networkAddress));

  if (event.type === "TrustlineUpdateRequest") {
    return (
      <TrustlineUpdateRequestCard
        event={event as NormalizedTrustlineUpdateRequestEvent}
        network={network}
      />
    );
  } else if (event.type === "TrustlineUpdate") {
    return (
      <TrustlineUpdateCard
        event={event as NormalizedTrustlineUpdateEvent}
        network={network}
      />
    );
  } else {
    return (
      <TransferCard
        event={event as NormalizedTransferEvent}
        network={network}
      />
    );
  }
};

export default Event;

import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { NormalizedTrustlineUpdateEvent } from "../../state/events/types";
import { Network } from "../../state/networks/types";
import Header from "../Header";

interface TrustlineUpdateCardProps {
  event: NormalizedTrustlineUpdateEvent;
  network: Network;
}

const TrustlineUpdateCard: React.FC<TrustlineUpdateCardProps> = ({
  event,
  network,
}) => {
  const given = event.from === event.accountAddress;
  return (
    <Stack mb={2}>
      <Header title={event.type} backButton={true} />
      <Box p={4} shadow="md" borderWidth="1px">
        <Text fontSize="md" color="grey">
          Partner
        </Text>
        <Text>{event.counterParty}</Text>
        <Text fontSize="md" color="grey">
          Currency Network
        </Text>
        <Text>
          {network.abbreviation} {network.name}
        </Text>
        <Text fontSize="md" color="grey">
          Give Credit Line
        </Text>
        {given ? (
          <Text>{`${event.given} ${network.abbreviation}`}</Text>
        ) : (
          <Text>{`${event.received} ${network.abbreviation}`}</Text>
        )}
        <Text fontSize="md" color="grey">
          Receive Credit Line
        </Text>
        {given ? (
          <Text>{`${event.received} ${network.abbreviation}`}</Text>
        ) : (
          <Text>{`${event.given} ${network.abbreviation}`}</Text>
        )}
      </Box>
    </Stack>
  );
};

export default TrustlineUpdateCard;

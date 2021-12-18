import { Box, Center, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { NormalizedTransferEvent } from "../../state/events/types";
import { Network } from "../../state/networks/types";
import Header from "../Header";

interface TransferCardProps {
  event: NormalizedTransferEvent;
  network: Network;
}

const TransferCard: React.FC<TransferCardProps> = ({ event, network }) => {
  const sent = event.direction === "sent";
  return (
    <Stack mb={2}>
      {sent ? (
        <Header title="Payment Sent" backButton={true} />
      ) : (
        <Header title="Payment Received" backButton={true} />
      )}
      <Center>
        {sent ? (
          <Text fontSize="xl">
            {`-${event.amount} ${network.abbreviation}`}
          </Text>
        ) : (
          <Text fontSize="xl">
            {`+${event.amount} ${network.abbreviation}`}
          </Text>
        )}
      </Center>
      <Box p={4} shadow="md" borderWidth="1px">
        <Text fontSize="md" color="grey">
          Counter Party
        </Text>
        <Text fontWeight={400}>{event.counterParty}</Text>
        <Text fontSize="md" color="grey">
          Amount
        </Text>
        <Text
          fontWeight={400}
        >{`${event.amount} ${network.abbreviation}`}</Text>
      </Box>
    </Stack>
  );
};

export default TransferCard;

import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Stack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getTrustlineUpdateOfCurrentRequest } from "../../state/events/select";
import { NormalizedTrustlineUpdateRequestEvent } from "../../state/events/types";
import { Network } from "../../state/networks/types";
import Header from "../Header";
import RoundButton from "../RoundButton";
import * as client from "../../lib/client";
import { useNavigate } from "react-router";

interface TrustlineUpdateRequestCardProps {
  event: NormalizedTrustlineUpdateRequestEvent;
  network: Network;
}

const TrustlineUpdateRequestCard: React.FC<TrustlineUpdateRequestCardProps> = ({
  event,
  network,
}) => {
  const given = event.from === event.accountAddress;
  const trustlineUpdate = useSelector(
    getTrustlineUpdateOfCurrentRequest(event)
  );
  const accepted = !isEmpty(trustlineUpdate);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const acceptTrustline = async () => {
    setLoading(true);
    try {
      const { rawTx } = await client.prepareTrustlineAccept(
        event.networkAddress,
        event.from,
        event.received,
        event.given
      );
      await client.confirmTrustlineTransaction(rawTx);
      setLoading(false);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      setLoading(false);
    }
  };

  return (
    <Stack mb={2}>
      <Header title={event.type} backButton={true} />
      {!isEmpty(error) && (
        <Alert status="error">
          <AlertIcon />
          There was an error processing your request
        </Alert>
      )}
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
      {given ? null : accepted ? (
        <Center>
          <Tag
            _hover={{ cursor: "pointer" }}
            my={2}
            size="sm"
            variant="outline"
            colorScheme="blue"
          >
            <TagLabel>Accepted</TagLabel>
          </Tag>
        </Center>
      ) : (
        <RoundButton onClick={acceptTrustline} isLoading={loading}>
          Accept
        </RoundButton>
      )}
    </Stack>
  );
};

export default TrustlineUpdateRequestCard;

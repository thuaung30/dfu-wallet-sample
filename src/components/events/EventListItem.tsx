import { Box, Divider, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";
import { Event } from "../../state/events/types";

interface EventListItemProps {
  event: Event;
  rightArrow?: boolean;
}

const EventListItem: React.FC<EventListItemProps> = ({
  event,
  rightArrow = false,
}) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/events/${event.id}`);
  };
  const transfer = event.type === "Transfer";
  return (
    <Box _hover={{ cursor: "pointer" }} onClick={onClick} px={4} pt={4}>
      {transfer ? (
        <Text fontSize="lg" fontWeight="500">
          Payment {event.direction}
        </Text>
      ) : (
        <Text fontSize="lg" fontWeight="500">
          {event.type}
        </Text>
      )}
      <Text color="grey" fontSize="xs" isTruncated>
        {event.counterParty}
      </Text>
      <Divider mt={4} />
    </Box>
  );
};

export default EventListItem;

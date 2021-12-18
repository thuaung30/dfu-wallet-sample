import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Center, Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React from "react";
import { useNavigate } from "react-router";
import { Event } from "../../state/events/types";
import EventListItem from "./EventListItem";

interface EventsListCardProps {
  events: Event[];
  dashboard?: boolean;
  rightArrow?: boolean;
}

const EventsListCard: React.FC<EventsListCardProps> = ({
  events,
  dashboard = false,
  rightArrow = false,
}) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/events");
  };

  if (isEmpty(events)) {
    return null;
  }

  return (
    <Box shadow="md" borderWidth="1px">
      {events.map((event, index) => (
        <EventListItem key={index} event={event} rightArrow={rightArrow} />
      ))}
      {dashboard && (
        <Center>
          <Tag
            _hover={{ cursor: "pointer" }}
            my={2}
            size="sm"
            variant="outline"
            colorScheme="blue"
            onClick={onClick}
          >
            <TagLabel>View more events</TagLabel>
            <TagRightIcon as={ArrowForwardIcon} />
          </Tag>
        </Center>
      )}
    </Box>
  );
};

export default EventsListCard;

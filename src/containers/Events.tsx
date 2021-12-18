import { Stack } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import EventsListCard from "../components/events/EventsListCard";
import Header from "../components/Header";
import { loadAccountRequest } from "../state/account/actions";
import { getCurrentAccountSelector } from "../state/account/select";
import { Account } from "../state/account/types";
import { fetchEventsInAllNetworksRequest } from "../state/events/actions";
import { getEvents } from "../state/events/select";

const Events: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account: Account | {} = useSelector(getCurrentAccountSelector);
  const events = useSelector(getEvents);

  useEffect(() => {
    if (isEmpty(account)) navigate("/landing");
    dispatch(loadAccountRequest());
    dispatch(fetchEventsInAllNetworksRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack mb={2}>
      <Header title="Events" backButton={true} />
      <EventsListCard events={events} />
    </Stack>
  );
};

export default Events;

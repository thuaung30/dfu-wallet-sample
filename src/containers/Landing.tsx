import { Stack, Text } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AlertCard from "../components/AlertCard";
import RoundButton from "../components/RoundButton";
import { createAccountRequest } from "../state/account/actions";
import {
  getCurrentAccountSelector,
  getAccountErrorSelector,
  getAccountLoadingSelector,
} from "../state/account/select";

const Landing: React.FC = () => {
  const dispatch = useDispatch();
  const account = useSelector(getCurrentAccountSelector);
  const isLoading = useSelector(getAccountLoadingSelector);
  const error = useSelector(getAccountErrorSelector);
  const navigate = useNavigate();

  const onClickSignUp = () => {
    dispatch(createAccountRequest());
  };

  useEffect(() => {
    if (!!account && !isEmpty(account)) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <>
      <Text my={16} align="center" color="blue.500" fontSize="6xl">
        DFU Wallet
      </Text>
      <Text color="grey" align="center">
        To make payments, you first need to create a trustline with a partner.
      </Text>
      <Text color="grey" mb={8} align="center">
        Each trustline also connects you to friends of friends so you can pay
        anyone in your network.
      </Text>
      <Stack mb={2}>
        {!!error && !isEmpty(error) && error.message.length > 0 && (
          <AlertCard
            message={`There was an error processing your request. ${error.message}`}
          />
        )}
        <RoundButton isLoading={isLoading} onClick={onClickSignUp}>
          Sign up
        </RoundButton>
        <Link to="/login">
          <Text align="center" color="blue.500">
            Login
          </Text>
        </Link>
      </Stack>
    </>
  );
};

export default Landing;

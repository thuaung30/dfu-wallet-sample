import { Stack, Input, Text } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AlertCard from "../components/AlertCard";
import RoundButton from "../components/RoundButton";
import {
  recoverAccountFail,
  recoverAccountRequest,
} from "../state/account/actions";
import {
  getCurrentAccountSelector,
  getAccountLoadingSelector,
  getAccountErrorSelector,
} from "../state/account/select";

const Login: React.FC = () => {
  const privateKeyRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const account = useSelector(getCurrentAccountSelector);
  const isLoading = useSelector(getAccountLoadingSelector);
  const error = useSelector(getAccountErrorSelector);
  const navigate = useNavigate();

  const onClickLogin = () => {
    if (!privateKeyRef.current?.value)
      recoverAccountFail(new Error("Private key is not filled yet."));
    dispatch(recoverAccountRequest(privateKeyRef.current!.value));
  };

  useEffect(() => {
    if (!!account && !isEmpty(account)) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <>
      <Stack mb={2}>
        <Text fontSize="xl">Enter your private key.</Text>
        {!!error && !isEmpty(error) && error.message.length > 0 && (
          <AlertCard
            message={`There was an error processing your request. Error - ${error?.message}`}
          />
        )}
        <Input ref={privateKeyRef} placeholder="0x..." />
        <RoundButton isLoading={isLoading} onClick={onClickLogin}>
          Login
        </RoundButton>
      </Stack>
    </>
  );
};

export default Login;

import { Box, Heading, Button, Text, chakra, Divider } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React from "react";
import { Account } from "../state/account/types";
import { Network } from "../state/networks/types";
import { NetworkUserData } from "../state/networksUserData/types";
import AlertCard from "./AlertCard";

interface AccountCardProps {
  account: Account;
  networkUserData: NetworkUserData;
  network: Network;
  onClickExport: () => Promise<void>;
}

const AccountCard: React.FC<AccountCardProps> = ({
  onClickExport,
  account,
  networkUserData,
  network,
}) => {
  return (
    <Box p={4} shadow="md" borderWidth="1px">
      <Heading size="md">Wallet Address</Heading>
      <Text color="grey" fontSize="md">
        {account.address}
      </Text>
      {!!networkUserData && !isEmpty(networkUserData) ? (
        <>
          {" "}
          <Box fontSize="lg">
            <chakra.span fontWeight="bold">{`${networkUserData?.leftReceived} ${network.abbreviation}`}</chakra.span>
            <chakra.span color="grey"> Available</chakra.span>
          </Box>
          <Text
            color="grey"
            fontSize="sm"
          >{`${networkUserData?.balance} ${network.abbreviation}`}</Text>
          <Divider my={2} />
          <Button onClick={onClickExport} size="xs" colorScheme="gray">
            Export private key
          </Button>
        </>
      ) : (
        <AlertCard message="Please select a currency network." />
      )}
    </Box>
  );
};

export default AccountCard;

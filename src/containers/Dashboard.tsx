import { Select, Stack, useToast } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AccountCard from "../components/AccountCard";
import AlertCard from "../components/AlertCard";
import EventsListCard from "../components/events/EventsListCard";
import Header from "../components/Header";
import Loading from "../components/Loading";
import LogoutDialog from "../components/LogoutDialog";
// import RoundButton from "../components/RoundButton";
import SendModal from "../components/SendModal";
import TrustlineRequestModal from "../components/TrustlineRequestModal";
import { __DEV__ } from "../config";
import {
  confirmTrustlineTransaction,
  exportPrivateKey,
  prepareTrustlineUpdate,
  sendPayment,
} from "../lib/client";
import {
  loadAccountRequest,
  logoutAccountRequest,
  selectCurrency,
} from "../state/account/actions";
import { getCurrentAccountSelector } from "../state/account/select";
import { Account } from "../state/account/types";
import { fetchEventsInAllNetworksRequest } from "../state/events/actions";
import { getSlicedEventsForDashboard } from "../state/events/select";
import { fetchAllNetworksRequest } from "../state/networks/actions";
import {
  getNetworkSelector,
  getNetworksLoadingSelector,
  getNetworksSelector,
} from "../state/networks/select";
import { Network } from "../state/networks/types";
import { fetchNetworkUserDataRequest } from "../state/networksUserData/actions";
import {
  getNetworksUserDataForCurrentAccountSelector,
  getNetworksUserDataLoadingSelector,
} from "../state/networksUserData/select";
import { NetworksUserDataNormalized } from "../state/networksUserData/types";

const Dashboard: React.FC = () => {
  const account: Account | {} = useSelector(getCurrentAccountSelector);
  const selectedNetworkAddress = (account as Account).selectedNetworkAddress;
  const networksLoading = useSelector(getNetworksLoadingSelector);
  const networks = useSelector(getNetworksSelector);
  const events = useSelector(getSlicedEventsForDashboard);
  const network: Network | {} = useSelector(getNetworkSelector);
  const networksUserData: NetworksUserDataNormalized | {} = useSelector(
    getNetworksUserDataForCurrentAccountSelector
  );
  const networksUserDataLoading = useSelector(
    getNetworksUserDataLoadingSelector
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [action, setAction] = useState(false);

  __DEV__ && console.log(events);

  const trustlineRequest = useCallback(
    async (
      counterPartyAddress: string,
      creditlineGiven: string,
      creditlineReceived: string
    ) => {
      if (!!selectedNetworkAddress) {
        const { rawTx } = await prepareTrustlineUpdate(
          selectedNetworkAddress,
          counterPartyAddress,
          creditlineGiven,
          creditlineReceived
        );
        await confirmTrustlineTransaction(rawTx);
        setAction(!action);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedNetworkAddress]
  );

  const onClickExport = useCallback(async () => {
    const pKey = await exportPrivateKey();
    await navigator.clipboard.writeText(pKey);
    toast({
      title: "Exported private key.",
      description: "Your private key was exported and copied to clipboard.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickSend = useCallback(
    async (receiverAddress: string, sendValue: string) => {
      await sendPayment(selectedNetworkAddress, receiverAddress, sendValue);
      setAction(!action);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedNetworkAddress]
  );

  const onClickLogout = useCallback(() => {
    dispatch(logoutAccountRequest());
    navigate("/landing");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedNetworkAddress)
      dispatch(fetchNetworkUserDataRequest(selectedNetworkAddress));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNetworkAddress]);

  useEffect(() => {
    if (isEmpty(account)) navigate("/landing");
    dispatch(loadAccountRequest());
    dispatch(fetchAllNetworksRequest());
    dispatch(fetchEventsInAllNetworksRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  return (
    <Stack mb={2}>
      <Header title="Dashboard" fontSize="2xl" />
      {networksLoading ? (
        <Loading />
      ) : (
        !isEmpty(networks) && (
          <Select
            value={selectedNetworkAddress ? selectedNetworkAddress : undefined}
            onChange={(e) => {
              const networkAddress = e.target.value;
              dispatch(
                selectCurrency((account as Account).address, networkAddress)
              );
            }}
          >
            {networks.map((network, i) => (
              <option key={i} value={network.address}>
                {`${network.name} - ${network.abbreviation}`}
              </option>
            ))}
          </Select>
        )
      )}
      {networksUserDataLoading ? (
        <Loading />
      ) : !isEmpty(account) &&
        networksUserData !== undefined &&
        !isEmpty(networksUserData) ? (
        <AccountCard
          account={account as Account}
          networkUserData={
            (networksUserData as NetworksUserDataNormalized)[
              selectedNetworkAddress!
            ]
          }
          network={network as Network}
          onClickExport={onClickExport}
        />
      ) : (
        <AlertCard message="Please select a currency network." />
      )}
      <SendModal send={onClickSend} />
      <TrustlineRequestModal trustlineRequest={trustlineRequest} />
      <LogoutDialog onClickLogout={onClickLogout} />
      {/* <RoundButton onClick={onClickLogout} colorScheme="blue">
        Logout
      </RoundButton> */}
      <EventsListCard events={events} dashboard={true} rightArrow={true} />
    </Stack>
  );
};

export default Dashboard;

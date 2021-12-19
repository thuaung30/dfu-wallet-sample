import { Box, Divider } from "@chakra-ui/layout";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import AlertCard from "./AlertCard";
import RoundButton from "./RoundButton";

type InviteModalProps = {
  trustlineRequest: (
    counterPartyAddress: string,
    creditlineGiven: string,
    creditlineReceived: string
  ) => Promise<void>;
};

const TrustlineRequestModal: React.FC<InviteModalProps> = ({
  trustlineRequest,
}) => {
  const counterPartyAddress = useRef<HTMLInputElement>(null);
  const creditlineGiven = useRef<HTMLInputElement>(null);
  const creditlineReceived = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickSend = async () => {
    setLoading(true);
    try {
      if (
        counterPartyAddress.current?.value != null &&
        creditlineGiven.current?.value != null &&
        creditlineReceived.current?.value != null
      ) {
        await trustlineRequest(
          counterPartyAddress.current.value,
          creditlineGiven.current.value,
          creditlineReceived.current.value
        );
        setLoading(false);
        onClose();
      }
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        console.error(err);
        setError(err.message);
      }
    }
  };

  return (
    <>
      <RoundButton onClick={onOpen}>New Trustline</RoundButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Trustline</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error.length > 0 && (
              <AlertCard
                message={`There was an error processing your request. Error - ${error}`}
              />
            )}
            <Input mb={2} ref={counterPartyAddress} placeholder="0x..." />
            <Input mb={2} ref={creditlineGiven} placeholder="credit given" />
            <Input ref={creditlineReceived} placeholder="credit received" />
          </ModalBody>
          <ModalFooter>
            <RoundButton
              isLoading={loading}
              colorScheme="blue"
              onClick={onClickSend}
            >
              Request Trustline
            </RoundButton>
            <Box mr={4} height="20px">
              <Divider orientation="vertical" />
            </Box>
            <RoundButton colorScheme="red" onClick={onClose}>
              Close
            </RoundButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TrustlineRequestModal;

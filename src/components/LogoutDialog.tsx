import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import React from "react";
import RoundButton from "./RoundButton";

interface LogoutDialogProps {
  onClickLogout: () => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({ onClickLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const onLogout = () => {
    onClose();
    onClickLogout();
  };

  return (
    <>
      <RoundButton colorScheme="blue" onClick={() => setIsOpen(true)}>
        Logout
      </RoundButton>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? Make sure you export your private key and save it
              somewhere before logging out.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onLogout} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default LogoutDialog;

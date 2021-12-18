import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

interface AlertCardProps {
  status?: "error" | "info" | "warning" | "success";
  message: string;
}

const AlertCard: React.FC<AlertCardProps> = ({ status = "error", message }) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default AlertCard;

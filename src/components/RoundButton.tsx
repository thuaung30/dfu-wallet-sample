import { Button } from "@chakra-ui/button";
import React from "react";

interface RoundButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  colorScheme?: string | undefined;
  isLoading?: boolean | undefined;
}

const RoundButton: React.FC<RoundButtonProps> = ({
  onClick,
  colorScheme = "blue",
  isLoading,
  children,
}) => {
  return (
    <Button
      borderRadius="32px"
      onClick={onClick}
      colorScheme={colorScheme}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
};

export default RoundButton;

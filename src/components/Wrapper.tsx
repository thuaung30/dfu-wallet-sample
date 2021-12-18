import { Box } from "@chakra-ui/layout";
import React from "react";

interface WrapperProps {
  variant?: "small" | "regular";
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant }) => {
  return (
    <Box
      mt={2}
      maxW={variant === "regular" ? "768px" : "360px"}
      mx="auto"
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;

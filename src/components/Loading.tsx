import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading: React.FC = () => {
  return (
    <Center p={5}>
      <Spinner />
    </Center>
  );
};

export default Loading;

import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, Box, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";

interface HeaderProps {
  title: string;
  fontSize?: "2xl" | "xl" | "lg" | "md";
  backButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  fontSize = "xl",
  backButton = false,
}) => {
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <Flex alignItems="center">
      {backButton && (
        <ArrowBackIcon _hover={{ cursor: "pointer" }} onClick={onClickBack} />
      )}
      <Box flex="1" textAlign="center">
        <Heading fontSize={fontSize}>{title}</Heading>
      </Box>
    </Flex>
  );
};

export default Header;

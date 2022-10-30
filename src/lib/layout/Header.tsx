import { Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react";

import AvatarIcon from "../assets/icons/avatar.svg";
import NotificationIcon from "../assets/icons/notification.svg";
import RepeatIcon from "../assets/icons/repeat.svg";

const Header = () => {
  return (
    <Flex
      minH="93px"
      align="center"
      pl="10"
      pr="12"
      justify="space-between"
      position="sticky"
      top="0"
      zIndex="sticky"
      bg="white"
    >
      <Text
        fontFamily="'Lato', sans-serif"
        fontSize="32px"
        lineHeight="38px"
        letterSpacing="0.374px"
        color="primaryBlue.500"
      >
        Users
      </Text>
      <HStack spacing="30px">
        <Icon as={RepeatIcon} boxSize="20px" />
        <Icon as={NotificationIcon} boxSize="20px" />
        <VStack spacing="1" align="start">
          <Text
            color="neutral.800"
            fontWeight="medium"
            fontSize="20px"
            lineHeight="24px"
          >
            Ole Gunnar
          </Text>
          <Text color="neutral.700" fontSize="14px" lineHeight="17px">
            Super Admin
          </Text>
        </VStack>
        <Icon as={AvatarIcon} boxSize="45px" />
      </HStack>
    </Flex>
  );
};

export default Header;

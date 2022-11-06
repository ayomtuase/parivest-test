import {
  Flex,
  HStack,
  Icon,
  IconButton,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";

import AvatarIcon from "../assets/icons/avatar.svg";
import HamburgerIcon from "../assets/icons/hamburger.svg";
import Logo from "../assets/icons/logo.svg";
import NotificationIcon from "../assets/icons/notification.svg";
import RepeatIcon from "../assets/icons/repeat.svg";

const Header = ({
  showNav,
  setShowNav,
  setCollapseLgNav,
}: {
  showNav: boolean;
  setShowNav: Dispatch<SetStateAction<boolean>>;
  setCollapseLgNav: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Flex
      minH={{ base: "80px", lg: "93px" }}
      align="center"
      pl={{ base: "4", lg: "10" }}
      pr={{ base: "4", lg: "12" }}
      justify="space-between"
      position="fixed"
      minW="100%"
      top="0"
      zIndex="sticky"
      bg="white"
      boxShadow="base"
    >
      <HStack spacing="4" align="center">
        <Show below="lg">
          <IconButton
            position="relative"
            bg="transparent"
            className={`toggle-btn ${showNav ? "onclick" : ""}`}
            icon={
              <Text
                as="span"
                bg="primaryBlue.500"
                left="50%"
                transform="translateX(-50%)"
                _before={{ bg: "primaryBlue.500", left: "0" }}
                _after={{ bg: "primaryBlue.500", left: "0" }}
              />
            }
            aria-label="Hide Navigation"
            onClick={() => setShowNav((show) => !show)}
          />
        </Show>
        <Show above="lg">
          <IconButton
            icon={
              <Icon as={HamburgerIcon} color="primaryBlue.500" boxSize="24px" />
            }
            borderRadius="50%"
            boxSize="48px"
            bg="transparent"
            _hover={{ bg: "gray.100" }}
            _focusVisible={{ bg: "gray.100" }}
            aria-label="Collapse Navigation"
            onClick={() => setCollapseLgNav((collapse) => !collapse)}
          />
        </Show>
        <Icon
          as={Logo}
          w={{ base: "150px", md: "180px", lg: "222px" }}
          h="38px"
        />
        <Text
          fontFamily="'Lato', sans-serif"
          fontSize="32px"
          lineHeight="38px"
          letterSpacing="0.374px"
          color="primaryBlue.500"
          display={{ base: "none", md: "inline" }}
        >
          Users
        </Text>
      </HStack>

      <HStack spacing="30px">
        <Icon
          as={RepeatIcon}
          boxSize="20px"
          display={{ base: "none", md: "inline" }}
        />
        <Icon
          as={NotificationIcon}
          boxSize="20px"
          display={{ base: "none", md: "inline" }}
        />
        <VStack spacing="1" align="start">
          <Text
            color="neutral.800"
            fontWeight="medium"
            fontSize="20px"
            lineHeight="24px"
            display={{ base: "none", md: "inline" }}
          >
            Ole Gunnar
          </Text>
          <Text
            color="neutral.700"
            fontSize="14px"
            lineHeight="17px"
            display={{ base: "none", md: "inline" }}
          >
            Super Admin
          </Text>
        </VStack>
        <Icon as={AvatarIcon} boxSize="45px" />
      </HStack>
    </Flex>
  );
};

export default Header;

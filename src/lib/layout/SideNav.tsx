import {
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
  type As,
} from "@chakra-ui/react";

import AdminsIcon from "../assets/icons/admins.svg";
import ChangePasswordIcon from "../assets/icons/change-password.svg";
import HomeIcon from "../assets/icons/home.svg";
import InvestmentIcon from "../assets/icons/investment.svg";
import Logo from "../assets/icons/logo.svg";
import LogoutIcon from "../assets/icons/logout.svg";
import SavingsIcon from "../assets/icons/savings.svg";
import UsersIcon from "../assets/icons/users.svg";
import WalletIcon from "../assets/icons/wallet.svg";

const NavItem = ({
  icon,
  navItemName,
  active = false,
}: {
  icon: As<JSX.Element> | undefined;
  navItemName: string;
  active?: boolean;
}) => {
  return (
    <HStack
      bg={active ? "primaryBlue.100" : "white"}
      pl="10px"
      h="56px"
      w="100%"
      rounded="8px"
      borderLeftColor={active ? "primaryBlue.500" : ""}
      borderLeftWidth={active ? "8px" : "0"}
    >
      <Icon as={icon} boxSize="25px" me="19px" />
      <Text
        fontFamily="'Lato', sans-serif"
        letterSpacing="0.374px"
        color={active ? "primaryBlue.500" : "neutral.600"}
      >
        {navItemName}
      </Text>
    </HStack>
  );
};

const SideNav = () => {
  return (
    <Flex
      direction="column"
      minW="17%"
      minH="100vh"
      maxH="100vh"
      position="sticky"
      top="0"
      overflowY="auto"
      overflowX="clip"
      zIndex="sticky"
      bg="white"
      left="0"
    >
      <Box
        position="fixed"
        bg="white"
        zIndex="sticky"
        px={{ lg: "3", xl: "6" }}
        pt="6"
      >
        <Icon as={Logo} w={{ lg: "170px", xl: "222px" }} h="38px" />
      </Box>
      <VStack align="start" justify="space-between" flexGrow="1" mt="95px">
        <VStack w="100%" align="start" pl="8px" pr="8px">
          {[
            {
              icon: HomeIcon,
              navItemName: "Home",
            },
            {
              icon: UsersIcon,
              navItemName: "Users",
            },
            {
              icon: InvestmentIcon,
              navItemName: "Investment",
            },
            {
              icon: SavingsIcon,
              navItemName: "Savings",
            },
            {
              icon: WalletIcon,
              navItemName: "Wallet",
            },
            {
              icon: AdminsIcon,
              navItemName: "Admins",
            },
          ].map((item) => (
            <NavItem
              key={item.navItemName}
              icon={item.icon}
              navItemName={item.navItemName}
              active={item.navItemName === "Users"}
            />
          ))}
        </VStack>

        <VStack w="100%" align="start" pl="8px" pr="8px">
          <Divider
            my="6"
            bg="neutral.300"
            h="2px"
            ml="29px"
            mr="24px"
            w="calc(100% - 29px - 24px)"
          />
          <VStack w="100%" align="start">
            {[
              {
                icon: ChangePasswordIcon,
                navItemName: "Change Password",
              },
              {
                icon: LogoutIcon,
                navItemName: "Logout",
              },
            ].map((item) => (
              <NavItem
                key={item.navItemName}
                icon={item.icon}
                navItemName={item.navItemName}
              />
            ))}
          </VStack>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default SideNav;

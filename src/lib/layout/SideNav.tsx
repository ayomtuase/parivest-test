import { Divider, Flex, VStack } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";

import AdminsIcon from "../assets/icons/admins.svg";
import ChangePasswordIcon from "../assets/icons/change-password.svg";
import HomeIcon from "../assets/icons/home.svg";
import InvestmentIcon from "../assets/icons/investment.svg";
import LogoutIcon from "../assets/icons/logout.svg";
import SavingsIcon from "../assets/icons/savings.svg";
import UsersIcon from "../assets/icons/users.svg";
import WalletIcon from "../assets/icons/wallet.svg";
import NavItem from "lib/components/NavItem";

const SideNav = ({
  isNavCollapsed,
  isNavHovered,
  setNavHovered,
}: {
  isNavCollapsed: boolean;
  isNavHovered: boolean;
  setNavHovered: Dispatch<SetStateAction<boolean>>;
}) => {
  const shouldNavEnlarge = () => {
    if (!isNavCollapsed) {
      return true;
    }
    return isNavHovered;
  };
  return (
    <Flex
      direction="column"
      minW={{
        lg: !shouldNavEnlarge() ? "7%" : "20%",
        xl: !shouldNavEnlarge() ? "5%" : "17%",
      }}
      onMouseEnter={() => {
        if (!isNavCollapsed) {
          return;
        }
        setNavHovered(true);
      }}
      onMouseLeave={() => {
        if (!isNavCollapsed) {
          return;
        }
        setNavHovered(false);
      }}
      position={isNavHovered ? "absolute" : "relative"}
      minH="100%"
      maxH="100%"
      overflowY="auto"
      overflowX="clip"
      zIndex="sticky"
      bg="white"
      display={{ base: "none", lg: "flex" }}
    >
      <VStack align="start" justify="space-between" flexGrow="1" mt="30px">
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
              isNavCollapsed={!shouldNavEnlarge()}
            />
          ))}
        </VStack>

        <VStack w="100%" align="start" pl="8px" pr="8px">
          <Divider
            my="6"
            bg="neutral.300"
            h="2px"
            ml={!shouldNavEnlarge() ? "auto" : "29px"}
            mr={!shouldNavEnlarge() ? "auto" : "24px"}
            w={!shouldNavEnlarge() ? "80%" : "calc(100% - 29px - 24px)"}
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
                isNavCollapsed={!shouldNavEnlarge()}
              />
            ))}
          </VStack>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default SideNav;

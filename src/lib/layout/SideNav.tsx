import { Divider, Flex, Show, VStack } from "@chakra-ui/react";

import AdminsIcon from "../assets/icons/admins.svg";
import ChangePasswordIcon from "../assets/icons/change-password.svg";
import HomeIcon from "../assets/icons/home.svg";
import InvestmentIcon from "../assets/icons/investment.svg";
import LogoutIcon from "../assets/icons/logout.svg";
import SavingsIcon from "../assets/icons/savings.svg";
import UsersIcon from "../assets/icons/users.svg";
import WalletIcon from "../assets/icons/wallet.svg";
import NavItem from "lib/components/NavItem";

const SideNav = ({ collapseLgNav }: { collapseLgNav: boolean }) => {
  return (
    <Show above="lg">
      <Flex
        direction="column"
        w={{
          lg: collapseLgNav ? "8%" : "20%",
          xl: collapseLgNav ? "5%" : "17%",
        }}
        minH="100%"
        maxH="100%"
        overflowY="auto"
        overflowX="clip"
        zIndex="sticky"
        bg="white"
        boxShadow="base"
        position={{ base: "absolute", lg: "sticky" }}
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
                collapseLgNav={collapseLgNav}
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
                  collapseLgNav={collapseLgNav}
                />
              ))}
            </VStack>
          </VStack>
        </VStack>
      </Flex>
    </Show>
  );
};

export default SideNav;

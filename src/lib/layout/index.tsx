import { Flex, Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

import Header from "lib/layout/Header";
import SideNav from "lib/layout/SideNav";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <Flex w="100%">
      <SideNav />

      <Flex flexGrow="1" direction="column">
        {/* Top bar */}
        <Header />

        <Box bg="neutral.50" flexGrow="1" px="10" pt="10">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;

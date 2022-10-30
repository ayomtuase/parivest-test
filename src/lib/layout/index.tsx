import { Flex, Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

import Header from "lib/layout/Header";
import SideNav from "lib/layout/SideNav";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <Flex w="100%" maxW="100vw" minH="100vh" maxH="100vh">
      <SideNav />

      <Flex
        flexGrow="1"
        direction="column"
        position="sticky"
        minH="100vh"
        maxH="100vh"
        overflowY="auto"
      >
        {/* Top bar */}
        <Header />

        <Box bg="neutral.50" flexGrow="1" px="10" pt="10" maxW="100%">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;

import { Flex, Box, ScaleFade, Show } from "@chakra-ui/react";
import { useState, type ReactNode } from "react";

import Header from "lib/layout/Header";
import SideNav from "lib/layout/SideNav";

import MobileNav from "./MobileNav";

const sideNavMobileWidth = "300px";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  const [showNav, setShowNav] = useState<boolean>(false);

  const [collapseLgNav, setCollapseLgNav] = useState<boolean>(false);

  return (
    <Flex
      w="100%"
      maxW="100vw"
      minH="100vh"
      maxH="100vh"
      direction="column"
      position="relative"
    >
      <Header
        showNav={showNav}
        setShowNav={setShowNav}
        setCollapseLgNav={setCollapseLgNav}
      />

      <Flex
        position="relative"
        top={{ base: "80px", lg: "93px" }}
        minH={{ base: "calc(100vh - 80px)", lg: "calc(100vh - 93px)" }}
        maxH={{ base: "calc(100vh - 80px)", lg: "calc(100vh - 93px)" }}
      >
        <SideNav collapseLgNav={collapseLgNav} />

        {/* Mobile SideNav shadow */}
        <Show below="lg">
          <MobileNav showNav={showNav} navMobileWidth={sideNavMobileWidth} />
          <ScaleFade initialScale={0.95} in={showNav}>
            <Box
              position="absolute"
              minH="100%"
              maxH="100%"
              width={`calc(100vw - ${sideNavMobileWidth})`}
              display={showNav ? "block" : "none"}
              bg="rgba(0,0,0, 0.4)"
              left={sideNavMobileWidth}
              onClick={() => setShowNav(false)}
            />
          </ScaleFade>
        </Show>

        <Box
          bg="neutral.50"
          flexGrow="1"
          px="10"
          pt="10"
          maxW="100%"
          overflowX="auto"
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;

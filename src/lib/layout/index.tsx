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

  const [isNavCollapsed, setNavCollapsed] = useState<boolean>(false);
  const [isNavHovered, setNavHovered] = useState<boolean>(false);

  return (
    <Flex
      maxW="100vw"
      minH="100vh"
      maxH="100vh"
      direction="column"
      position="relative"
    >
      <Header
        showNav={showNav}
        setShowNav={setShowNav}
        setCollapseLgNav={setNavCollapsed}
      />

      <Flex
        position="relative"
        minH={{ base: "calc(100vh - 80px)", lg: "calc(100vh - 93px)" }}
        maxH={{ base: "calc(100vh - 80px)", lg: "calc(100vh - 93px)" }}
      >
        <SideNav
          isNavCollapsed={isNavCollapsed}
          isNavHovered={isNavHovered}
          setNavHovered={setNavHovered}
        />

        {/* Mobile SideNav and shadow */}
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
          px={{ base: "3", md: "10" }}
          pt="10"
          overflowX="auto"
          ml={{
            lg: isNavHovered ? "7%" : "0",
            xl: isNavHovered ? "5%" : "0",
          }}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;

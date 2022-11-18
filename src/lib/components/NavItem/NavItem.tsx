import { type As, HStack, Text, Icon } from "@chakra-ui/react";

const NavItem = ({
  icon,
  navItemName,
  active = false,
  isNavCollapsed = false,
}: {
  icon: As<JSX.Element> | undefined;
  navItemName: string;
  active?: boolean;
  isNavCollapsed?: boolean;
}) => {
  return (
    <HStack
      bg={active ? "primaryBlue.100" : "white"}
      pl={isNavCollapsed ? "0px" : "10px"}
      h="56px"
      w="100%"
      borderRadius={isNavCollapsed ? "full" : "8px"}
      borderLeftColor={active && !isNavCollapsed ? "primaryBlue.500" : ""}
      borderLeftWidth={active && !isNavCollapsed ? "8px" : "0"}
      justify={isNavCollapsed ? "center" : "start"}
      transitionProperty="justify-content,border-left-width"
      transitionDuration="0.25s"
      transitionTimingFunction="ease-in-out"
    >
      <Icon
        as={icon}
        boxSize="25px"
        me={{ base: "19px", lg: "12px" }}
        style={{ marginRight: `${isNavCollapsed ? "0px" : "12px"}` }}
        transition="all 0.25s ease-in-out"
      />
      <Text
        fontFamily="'Lato', sans-serif"
        letterSpacing="0.374px"
        color={active ? "primaryBlue.500" : "neutral.600"}
        display={isNavCollapsed ? "none" : "inline"}
        transition="display 4s ease-in-out"
      >
        {navItemName}
      </Text>
    </HStack>
  );
};

export default NavItem;

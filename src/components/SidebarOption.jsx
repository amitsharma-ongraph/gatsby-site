import { Box, Icon, Text } from "@chakra-ui/react";
import { useLocation } from "@reach/router";
import { navigate } from "gatsby";
import React from "react";

function SidebarOption({ path, icon, children }) {
  const location = useLocation();
  const selected = location.pathname === path;
  return (
    <Box
      pos="relative"
      columnGap={3}
      cursor="pointer"
      onClick={() => navigate(path)}
      rounded="sm"
      bgColor={selected ? "brand.800" : "transparent"}
      _hover={selected ? {} : { bgColor: "brand.100" }}
      color={selected ? "white" : "gray.900"}
      pointerEvents={location.pathname === path ? "none" : "all"}
      pr={3}
      pl={10}
      py={2}
      fontWeight={500}
      userSelect="none"
    >
      <Icon pos="absolute" left={3} top="9px" as={icon} fontSize="1.25rem" />
      <Text>{children}</Text>
    </Box>
  );
}

export default SidebarOption;

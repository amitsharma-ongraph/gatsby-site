import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Grid,
  GridItem,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Logo from "./Logo";
import { navigate } from "gatsby";
import { HiMenu } from "react-icons/hi";
import Sidebar from "./Sidebar";
import { useLocation } from "@reach/router";
import { BiFace } from "react-icons/bi";

function Header() {
  const { pathname } = useLocation();
  const { onClose, isOpen, onOpen } = useDisclosure({ defaultIsOpen: false });

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <Grid
      pos="sticky"
      top={0}
      templateColumns="1fr 0fr"
      h={"60px"}
      alignItems="center"
      px={4}
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      bgColor="white"
      zIndex={3}
    >
      <GridItem>
        <Box
          display={{ base: "block", lg: "none" }}
          borderRight="1px solid"
          borderRightColor="white"
        >
          <Logo />
        </Box>
      </GridItem>
      <GridItem>
        <Grid autoFlow="column" placeItems="center" columnGap={4}>
          <GridItem display={{ base: "block", md: "block" }}>
            <Avatar
              name={"user@gmail.com"}
              size="sm"
              onClick={() => navigate("/profile")}
              bgColor="brand.800"
              color="white"
              cursor="pointer"
              icon={<BiFace />}
            />
          </GridItem>
          <GridItem display={{ base: "block", lg: "none" }}>
            <Icon
              display="inline"
              verticalAlign="-7px"
              fontSize="2xl"
              as={HiMenu}
              color="black"
              cursor="pointer"
              onClick={onOpen}
            />
            {/* Drawer */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <Box h="full" overflowY="scroll">
                  <Sidebar {...{ onClose }} />
                </Box>
              </DrawerContent>
            </Drawer>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
}

export default Header;

import { Box, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Sidebar from "./Sidebar";
import ChakraProvider from "../poviders/ChakraProvider";
import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <ChakraProvider>
        <Box
          w="100vw"
          h="100vh"
          overflowY="hidden"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&::-webkit-scrollbar-thumb": {
              display: "none",
            },
          }}
        >
          <Grid templateColumns={{ base: "1fr", lg: "225px 1fr" }} h="full">
            <GridItem
              display={{ base: "none", lg: "block" }}
              h="full"
              overflowY="scroll"
            >
              <Sidebar />
            </GridItem>
            <GridItem
              h="full"
              overflowY="scroll"
              bgColor="white"
              borderLeft={{ base: "none", lg: "1px solid" }}
              borderLeftColor={{ base: "none", lg: "gray.200" }}
            >
              <Header />
              {children}
              <Box h={24} />
            </GridItem>
          </Grid>
        </Box>
      </ChakraProvider>
    </>
  );
}

export default Layout;

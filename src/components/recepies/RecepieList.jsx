import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import React from "react";
import RecepieCard from "./RecepieCard";

function RecepieList({ recepies, title }) {
  return (
    <Box px={10} py={10}>
      <Heading as="h2" size="md" mb={4}>
        {title}
      </Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
        {recepies.map((recepie, index) => (
          <Box key={index} width="100%">
            <RecepieCard recepie={recepie} />
          </Box>
        ))}
      </Grid>
      {(!recepies || recepies.length == 0) && (
        <Flex
          height={"100px"}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <h2>No recepies</h2>
        </Flex>
      )}
    </Box>
  );
}

export default RecepieList;

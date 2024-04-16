import React from "react";
import Layout from "../components/Layout";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "gatsby";

function About() {
  return (
    <Layout>
      <Box p={8}>
        <Heading mb={4}>Welcome to Our Recipe Platform</Heading>

        <Stack spacing={4} mb={8}>
          <Text>
            Explore our collection of delicious recipes from around the world!
          </Text>

          <Divider />

          <Text>
            Ready to save your favorite recipes and create your own culinary
            masterpieces?
          </Text>
        </Stack>

        <Divider />

        <Flex justify="center" mt={8}>
          <Text fontSize="sm" color="gray.500">
            &copy; 2024 Recipe Platform. All rights reserved.
          </Text>
        </Flex>
      </Box>
    </Layout>
  );
}

export default About;

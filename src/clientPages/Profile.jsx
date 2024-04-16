import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/Layout";
import { navigate } from "gatsby";
import { useNotification } from "../hooks/useNotification";

const Profile = () => {
  const [authState] = useAuth();
  const { user, logOut, loading } = useUser();
  const [notification, setNotification] = useNotification();

  if (!authState.isLoading && !authState.userId) {
    navigate("/login");
  }

  if (!authState.userId) {
    return (
      <Layout>
        <Box
          height={"100vh"}
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner />
        </Box>
      </Layout>
    );
  }
  return (
    <Layout>
      <Container maxW="container.sm">
        <Center mt={8}>
          <Box
            p={8}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="auto"
          >
            <Avatar
              size="xl"
              name={user?.email}
              backgroundColor={"brand.400"}
            />
            <Text mt={4} fontSize="lg">
              {user?.email}
            </Text>
            <Button
              mt={4}
              colorScheme="gray"
              onClick={() => {
                navigate("/personal-recepies");
              }}
            >
              Recipes
            </Button>
            <Button
              mt={4}
              colorScheme="gray"
              onClick={async () => {
                setNotification(await logOut());
              }}
            >
              Logout
            </Button>
          </Box>
        </Center>
      </Container>
    </Layout>
  );
};

export default Profile;

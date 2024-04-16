import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/Layout";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { navigate } from "gatsby";
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, recepieCollection } from "../firestore/collection";
import { ref } from "firebase/storage";
import { IoPeople, IoTimerOutline } from "react-icons/io5";
import { FaUtensils } from "react-icons/fa";

function PersonalRecepie({ productId: id }) {
  const [authState] = useAuth();
  const [recepie, setRecepie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRecepie(null);
    (async () => {
      try {
        setLoading(true);
        const docRef = await doc(db, "recepies", id);
        const docSnapShot = await getDoc(docRef);
        if (docSnapShot.exists()) {
          setRecepie(docSnapShot.data());
        } else {
          setRecepie(undefined);
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, [id]);

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
      <Box height={"100vh"} width={"100%"} px={8} py={8}>
        {!loading && !recepie && <h2>Recepie not found</h2>}
        {recepie && (
          <>
            <Heading as="h1" mb={4}>
              {recepie.title}
            </Heading>
            <Flex justifyContent="space-between" alignItems="flex-start" mb={6}>
              <Box
                display="grid"
                gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gap={6}
                justifyItems={"center"}
              >
                <Box
                  flex="1"
                  maxHeight={"400px"}
                  borderRadius={"50%"}
                  overflow={"hidden"}
                  maxWidth={"400px"}
                  minHeight={"300px"}
                  minWidth={"300px"}
                  backgroundColor={"gray"}
                >
                  <Image src={recepie.image} />
                </Box>
                <Box flex="1">
                  <Text fontSize="lg" color="gray.600" mb={6}>
                    {recepie.description}
                  </Text>
                </Box>
              </Box>
            </Flex>

            <Flex
              flexDirection={["column", "row"]}
              justifyContent="space-between"
              alignItems="center"
              mb={6}
              px={4}
            >
              <Flex direction={"column"} alignItems={"center"}>
                <Icon as={IoTimerOutline} fontSize={"24px"}></Icon>
                <Heading as="h3" fontSize="lg" mb={2}>
                  Prep Time
                </Heading>
                <Text>{recepie.prepTime} minutes</Text>
              </Flex>
              <Flex direction={"column"} alignItems={"center"}>
                <Icon as={FaUtensils} fontSize={"24px"}></Icon>
                <Heading as="h3" fontSize="lg" mb={2}>
                  Cook Time
                </Heading>
                <Text>{recepie.cookTime} minutes</Text>
              </Flex>
              <Flex direction={"column"} alignItems={"center"}>
                <Icon as={IoPeople} fontSize={"24px"}></Icon>
                <Heading as="h3" fontSize="lg" mb={2}>
                  Servings
                </Heading>
                <Text>{recepie.servings}</Text>
              </Flex>
            </Flex>

            <Divider my={6} />

            <Box>
              <Heading as="h2" fontSize="xl" mb={4}>
                Ingredients
              </Heading>
              <List styleType="disc">
                {recepie.ingredients.map((ingredient, index) => (
                  <ListItem key={index}>{ingredient}</ListItem>
                ))}
              </List>
            </Box>

            <Divider my={6} />

            <Box>
              <Heading as="h2" fontSize="xl" mb={4}>
                Instructions
              </Heading>
              <List styleType="decimal">
                {recepie.instructions.map((instruction, index) => (
                  <ListItem key={index}>{instruction}</ListItem>
                ))}
              </List>
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
}

export default PersonalRecepie;

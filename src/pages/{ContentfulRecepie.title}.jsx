import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FaUtensils } from "react-icons/fa";
import { IoPeople, IoTimerOutline } from "react-icons/io5";
import { Link } from "@reach/router";
import slugify from "slugify";

function RecepiePage({ data }) {
  const { title, description, prepTime, servings, cookTime, content, image } =
    data.allContentfulRecepie.nodes[0];

  const imagePath = getImage(image);
  return (
    <Layout>
      <Container maxW="container.lg" py={8} mx={"auto"}>
        <Heading as="h1" mb={4}>
          {title}
        </Heading>
        <Flex justifyContent="space-between" alignItems="flex-start" mb={6}>
          <Box
            display="grid"
            gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} // On small screens, it's one column; on medium screens, it's two columns
            gap={6} // Gap between grid items
            justifyItems={"center"}
          >
            <Box
              flex="1"
              maxHeight={"400px"}
              borderRadius={"50%"}
              overflow={"hidden"}
              maxWidth={"400px"}
            >
              <GatsbyImage
                image={imagePath}
                style={{ height: "100%" }}
                alt=""
              />
            </Box>
            <Box flex="1">
              <Text fontSize="lg" color="gray.600" mb={6}>
                {description?.description}
              </Text>
            </Box>
          </Box>
        </Flex>

        <Box flex="1" ml={6}>
          <Heading as="h2" fontSize="xl" mb={4}>
            Tags
          </Heading>
          <Flex flexWrap="wrap">
            {content.tags.map((tag, index) => (
              <Link to={`/tag/${slugify(tag, { lower: true })}`}>
                <Tag
                  key={index}
                  variant="subtle"
                  colorScheme="blue"
                  borderRadius="full"
                  mr={2}
                  mb={2}
                >
                  <TagLabel>{tag}</TagLabel>
                </Tag>
              </Link>
            ))}
          </Flex>
        </Box>
        <Divider my={6} />

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
            <Text>{prepTime} minutes</Text>
          </Flex>
          <Flex direction={"column"} alignItems={"center"}>
            <Icon as={FaUtensils} fontSize={"24px"}></Icon>
            <Heading as="h3" fontSize="lg" mb={2}>
              Cook Time
            </Heading>
            <Text>{cookTime} minutes</Text>
          </Flex>
          <Flex direction={"column"} alignItems={"center"}>
            <Icon as={IoPeople} fontSize={"24px"}></Icon>
            <Heading as="h3" fontSize="lg" mb={2}>
              Servings
            </Heading>
            <Text>{servings}</Text>
          </Flex>
        </Flex>

        <Divider my={6} />

        <Box>
          <Heading as="h2" fontSize="xl" mb={4}>
            Ingredients
          </Heading>
          <List styleType="disc">
            {content.ingredients.map((ingredient, index) => (
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
            {content.instructions.map((instruction, index) => (
              <ListItem key={index}>{instruction}</ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Layout>
  );
}

export const query = graphql`
  query getRecepie($title: String) {
    allContentfulRecepie(filter: { title: { eq: $title } }, limit: 1) {
      nodes {
        id
        cookTime
        prepTime
        servings
        title
        description {
          description
        }
        content {
          ingredients
          instructions
          tags
        }
        image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
        }
      }
    }
  }
`;

export default RecepiePage;

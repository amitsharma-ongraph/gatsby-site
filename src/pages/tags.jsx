import React from "react";
import Layout from "../components/Layout";
import { useRecepie } from "../hooks/useRecepie";
import { Box, Flex } from "@chakra-ui/react";
import { Link, navigate } from "gatsby";
import slugify from "slugify";

function Tags() {
  const { getTags } = useRecepie();
  const tags = getTags();
  return (
    <>
      <Layout>
        <Flex
          p={8}
          flexDirection={"row"}
          flexWrap={"wrap"}
          alignItems={"center"}
          gap={4}
          width={"100%"}
        >
          {tags.map((tag) => (
            <Box
              key={tag.name}
              as="flex"
              justifyContent={"center"}
              alignItems={"center"}
              minWidth={"200px"}
              p={4}
              backgroundColor={"brand.100"}
              flex={1}
              cursor={"pointer"}
              sx={{
                "&:hover": {
                  backgroundColor: "brand.400",
                },
              }}
              onClick={() => {
                navigate(`/tag/${slugify(tag.name, { lower: true })}`);
              }}
            >
              <h2>
                {tag.name} ({tag.count})
              </h2>
            </Box>
          ))}
        </Flex>
      </Layout>
    </>
  );
}

export default Tags;

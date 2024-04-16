import { Box, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import { FaUtensils } from "react-icons/fa";
import { IoTimerOutline } from "react-icons/io5";
import slugify from "slugify";

function RecepieCard({ recepie }) {
  const {
    image,
    title,
    prepTime,
    cookTime,
    description,
    isPersonal,
    productId,
  } = recepie;
  const imagePath = getImage(image);
  const slug = slugify(title, { lower: true });

  return (
    <Link to={`/${!isPersonal ? slug : `personal-recepie/${productId}`}`}>
      <Box
        width={"100%"}
        bgColor={"brand.50"}
        _hover={{
          ".hover-box": {
            height: "70%",
          },
          ".des-text": {
            display: "block",
          },
        }}
        minHeight={"100px"}
      >
        <Flex direction={"column"} alignItems={"center"} paddingBottom={2.5}>
          <Box width={"100%"} minHeight={"200px"} position={"relative"}>
            {!isPersonal && (
              <GatsbyImage
                image={imagePath}
                style={{ height: "100%", width: "100%" }}
                alt=""
              />
            )}
            {isPersonal && <Image src={image}></Image>}
            <Box
              position={"absolute"}
              bottom={"0px"}
              className="hover-box"
              width={"100%"}
              transitionDuration={2}
              transition={"ease-in-out"}
              backdropFilter={"blur(10px)"}
              padding={4}
              overflow={"scroll"}
              sx={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Text
                textAlign={"center"}
                display={"none"}
                className="des-text"
                overflow={"hidden"}
              >
                {description?.description}
              </Text>
            </Box>
          </Box>
          <Heading size={"md"} color={"brand.800"} paddingTop={2}>
            {title}
          </Heading>
          <Flex
            paddingTop={2}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            flexDirection={"row"}
            width={"100%"}
          >
            <Flex flexDirection={"row"} rowGap={"5px"} alignItems={"center"}>
              <Icon as={IoTimerOutline} color={"bg.600"} />
              <Text color={"bg.600"} marginLeft={2}>
                Prep Time:{prepTime}
              </Text>
            </Flex>
            <Flex flexDirection={"row"} alignItems={"center"}>
              <Icon as={FaUtensils} color={"bg.600"} />
              <Text color={"bg.600"} marginLeft={2}>
                Cook Time{cookTime}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
}

export default RecepieCard;

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/Layout";
import {
  Box,
  Button,
  CloseButton,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Spinner,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Link, navigate } from "gatsby";
import { useNotification } from "../hooks/useNotification";
import { usePersonalRecepie } from "../hooks/usePersonalRecepie";

function AddRecepie() {
  const [authState] = useAuth();
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    ingredients: [],
    instructions: [],
    image: null,
    imagePreview: null,
  });
  const { loading, addRecepie } = usePersonalRecepie();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleListChange = (index, field, value) => {
    const updatedList = [...recipe[field]];
    updatedList[index] = value;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [field]: updatedList,
    }));
  };

  const handleAddItem = (field) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [field]: [...prevRecipe[field], ""],
    }));
  };

  const handleRemoveItem = (field, index) => {
    const updatedList = [...recipe[field]];
    updatedList.splice(index, 1);
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [field]: updatedList,
    }));
  };

  const handleImageChange = (e) => {
    try {
      const selectedImage = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setRecipe((prevRecipe) => ({
          ...prevRecipe,
          image: selectedImage,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(selectedImage);
    } catch (e) {
      setRecipe({ ...recipe, image: null, imagePreview: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(await addRecepie(recipe));
  };

  return (
    <Layout>
      <Flex
        width={"100%"}
        flexDirection={"row"}
        justifyContent={"flex-end"}
        padding={4}
      >
        <Link to="/personal-recepies">
          <Button
            backgroundColor={"brand.600"}
            sx={{
              "&:hover": {
                backgroundColor: "brand.800",
              },
            }}
            color={"brand.50"}
          >
            Cancle
          </Button>
        </Link>
      </Flex>
      <Container maxW="90%">
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} mt={8}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={recipe.title}
                onChange={handleChange}
                placeholder="Enter recipe title"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={recipe.description}
                onChange={handleChange}
                placeholder="Enter recipe description"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                accept={{
                  "Image/jpg": [".jpg", ".jpeg"],
                  "Image/png": [".png"],
                }}
                onChange={handleImageChange}
              />
              {recipe.imagePreview && (
                <Box mt={2}>
                  <img
                    src={recipe.imagePreview}
                    alt="Recipe"
                    style={{ maxWidth: "200px" }}
                  />
                </Box>
              )}
            </FormControl>
            <Flex direction={{ base: "column", md: "row" }}>
              <Flex flex={"2"}>
                <FormControl flex="1" mr={4}>
                  <FormLabel>Prep Time</FormLabel>
                  <InputGroup>
                    <Input
                      type="text"
                      name="prepTime"
                      value={recipe.prepTime}
                      onChange={handleChange}
                      placeholder="Prep time"
                    />
                    <InputRightAddon children="mins" />
                  </InputGroup>
                </FormControl>
                <FormControl flex="1" mr={4}>
                  <FormLabel>Cook Time</FormLabel>
                  <InputGroup>
                    <Input
                      type="text"
                      name="cookTime"
                      value={recipe.cookTime}
                      onChange={handleChange}
                      placeholder="Cook time"
                    />
                    <InputRightAddon children="mins" />
                  </InputGroup>
                </FormControl>
              </Flex>
              <FormControl flex={"1"}>
                <FormLabel>Servings</FormLabel>
                <Input
                  type="text"
                  name="servings"
                  value={recipe.servings}
                  onChange={handleChange}
                  placeholder="Enter number of servings"
                />
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel>Ingredients</FormLabel>
              {recipe.ingredients.map((item, index) => (
                <Flex key={index} align="center">
                  <Input
                    flex="1"
                    value={item}
                    onChange={(e) =>
                      handleListChange(index, "ingredients", e.target.value)
                    }
                    placeholder="Enter ingredient"
                    mr={2}
                  />
                  <CloseButton
                    onClick={() => handleRemoveItem("ingredients", index)}
                  />
                </Flex>
              ))}
              <Button
                backgroundColor={"brand.600"}
                sx={{
                  "&:hover": {
                    backgroundColor: "brand.800",
                  },
                }}
                mt={2}
                onClick={() => handleAddItem("ingredients")}
                color={"brand.50"}
              >
                Add Ingredient
              </Button>
            </FormControl>
            <FormControl>
              <FormLabel>instructions</FormLabel>
              {recipe.instructions.map((item, index) => (
                <Flex key={index} align="center">
                  <Input
                    flex="1"
                    value={item}
                    onChange={(e) =>
                      handleListChange(index, "instructions", e.target.value)
                    }
                    placeholder="Enter step"
                    mr={2}
                  />
                  <CloseButton
                    onClick={() => handleRemoveItem("instructions", index)}
                  />
                </Flex>
              ))}
              <Button
                backgroundColor={"brand.600"}
                sx={{
                  "&:hover": {
                    backgroundColor: "brand.800",
                  },
                }}
                mt={2}
                onClick={() => handleAddItem("instructions")}
                color={"brand.50"}
              >
                Add Step
              </Button>
            </FormControl>

            <Button
              type="submit"
              backgroundColor={`${loading ? "brand.400" : "brand.600"}`}
              sx={{
                "&:hover": {
                  backgroundColor: "brand.800",
                },
              }}
              color={"brand.50"}
            >
              {loading ? "Adding Recepie...." : "Add Recepie"}
            </Button>
          </VStack>
        </form>
      </Container>
    </Layout>
  );
}

export default AddRecepie;

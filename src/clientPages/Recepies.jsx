import React from "react";
import Layout from "../components/Layout";
import { Box, Button, Flex, Spinner } from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";
import { Link, navigate } from "gatsby";
import { usePersonalRecepie } from "../hooks/usePersonalRecepie";
import RecepeiList from "../components/recepies/RecepieList";

function Recepies() {
  const [authState] = useAuth();
  const { recepies } = usePersonalRecepie();

  const getPersonalRecepies = () => {
    return recepies.map((recepie) => ({
      ...recepie,
      isPersonal: true,
      description: {
        description: recepie.description,
      },
    }));
  };

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
      <Flex
        width={"100%"}
        flexDirection={"row"}
        justifyContent={"flex-end"}
        padding={4}
      >
        <Link to="/add-recepie">
          <Button
            backgroundColor={"brand.600"}
            sx={{
              "&:hover": {
                backgroundColor: "brand.800",
              },
            }}
            color={"brand.50"}
          >
            Add Recepie
          </Button>
        </Link>
      </Flex>
      <RecepeiList
        title={"Personal Recepies"}
        recepies={getPersonalRecepies()}
      />
    </Layout>
  );
}

export default Recepies;

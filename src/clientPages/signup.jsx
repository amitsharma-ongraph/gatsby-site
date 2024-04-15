import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { navigate } from "gatsby";
import React, { useState } from "react";

function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <VStack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter your password"
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Signup
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login instead ????
        </Button>
      </VStack>
    </Box>
  );
}

export default Signup;

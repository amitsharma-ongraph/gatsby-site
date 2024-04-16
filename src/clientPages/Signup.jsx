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
import { useUser } from "../hooks/useUser";
import { useNotification } from "../hooks/useNotification";
function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { loading, signUp } = useUser();
  const [notification, setNotification] = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signUp({ email, password, confirmPassword });
    setNotification(res);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      as="form"
      onSubmit={handleSubmit}
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
        <FormControl id="confirmPassword">
          <FormLabel> Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Confirm password"
          />
        </FormControl>
        <Button
          colorScheme={`${loading ? "gray" : "blue"}`}
          onClick={handleSubmit}
          type="submit"
        >
          {loading ? "signing up......." : "Signup"}
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login instead ??????
        </Button>
      </VStack>
    </Box>
  );
}

export default Signup;

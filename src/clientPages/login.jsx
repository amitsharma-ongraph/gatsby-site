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
function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { loading, logIn } = useUser();
  const [notification, setNotification] = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await logIn({ email, password });
    setNotification(res);
    if (res.type === "success") {
      navigate("/profile");
    }
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
        <Button
          colorScheme={`${loading ? "gray" : "blue"}`}
          onClick={handleSubmit}
          type="submit"
        >
          {loading ? "loging in......." : "Login"}
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup instead ??????
        </Button>
      </VStack>
    </Box>
  );
}

export default Login;

import React, { useState, useEffect, createContext } from "react";
import { Flex, Center, Icon, Stack, Text, CloseButton } from "@chakra-ui/react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { navigate } from "gatsby";

var timeout;

export const notificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [notification]);

  useEffect(() => {
    if (notification && notification.path) {
      navigate(notification.path);
    }
  }, [notification]);

  return (
    <notificationContext.Provider value={[notification, setNotification]}>
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{
              y: "-100%",
            }}
            animate={{
              top: "15%",
            }}
            exit={{
              top: "-100%",
            }}
            transition={{
              duration: 1,
            }}
            style={{
              position: "fixed",
              zIndex: 99,
              pointerEvents: "none",
            }}
          >
            <Flex justifyContent="flex-end" width="100vw" p={3}>
              <Flex
                direction={{ base: "column", sm: "row" }}
                width={{ base: "full", sm: "md" }}
                bgColor={`${
                  notification.type === "success" ? "#B2B2B2" : "#FFCCCC"
                }`}
                borderRadius="sm"
                overflow="hidden"
                pointerEvents="all"
              >
                <Center
                  display={{ base: "none", sm: "flex" }}
                  bgColor={
                    notification.type === "error" ? "#FFCCCC" : "brand.800"
                  }
                  px="5"
                >
                  <Icon
                    as={
                      notification.type === "error" ? FiXCircle : FiCheckCircle
                    }
                    boxSize="10"
                    color="white"
                  />
                </Center>
                <Stack direction="row" p="4" spacing="3" flex="1">
                  <Stack spacing="2.5" flex="1">
                    <Stack spacing="1">
                      <Text fontSize="md" fontWeight={500} color="gray.900">
                        {notification.title}
                      </Text>
                      {notification.description && (
                        <Text fontSize="sm" color="gray.600">
                          {notification.description}
                        </Text>
                      )}
                    </Stack>
                  </Stack>
                  <CloseButton
                    _hover={{}}
                    transform="translateY(-6px)"
                    onClick={() => setNotification(null)}
                  />
                </Stack>
              </Flex>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </notificationContext.Provider>
  );
};

export { NotificationProvider };

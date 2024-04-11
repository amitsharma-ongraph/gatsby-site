import React from "react";
import {
  ChakraProvider as __ChakraProvider,
  theme,
  extendTheme,
} from "@chakra-ui/react";
import { Global } from "@emotion/react";
const extendedTheme = extendTheme(
  {
    initialColorMode: "light",
    useSystemColorMode: false,
    colors: {
      ...theme.colors,
      brand: {
        50: "#f7f7f7",
        100: "#e3e3e3",
        200: "#cecece",
        300: "#b9b9b9",
        400: "#a5a5a5",
        500: "#919191",
        600: "#7d7d7d",
        700: "#696969",
        800: "#555555",
        900: "#404040",
      },
    },
    fonts: {
      heading: "Lexend, sans-serif",
      body: "Inter, sans-serif",
      logo: "Playfair Display, serif",
    },
  },
  theme
);

const ChakraProvider = ({ children }) => {
  return (
    <__ChakraProvider {...{ theme: extendedTheme }}>
      <>
        <Global
          styles={{
            body: {
              textRendering: "optimizeLegibility",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            },
          }}
        />
        {children}
      </>
    </__ChakraProvider>
  );
};

export default ChakraProvider;

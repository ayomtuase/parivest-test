import type { DeepPartial, Theme } from "@chakra-ui/react";

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme["colors"]["blackAlpha"]>
> = {
  brand: {
    100: "",
    200: "",
    300: "",
    400: "",
    500: "",
    600: "",
    700: "",
    800: "",
    900: "",
  },
  primaryBlue: {
    50: "#F3F6FC",
    100: "#E7EEF9",
    200: "",
    300: "",
    400: "",
    500: "#295AA9",
    600: "#224B8D",
    700: "#1B3C71",
    800: "",
    900: "",
  },
  neutral: {
    50: "#F1F2F4",
    100: "",
    200: "#D6D9DD",
    300: "#C8CCD2",
    400: "",
    500: "",
    600: "#8C94A1",
    700: "#616976",
    800: "#3A3F47",
    900: "#131518",
  },
  tertiaryBlue: {
    50: "",
    100: "",
    200: "",
    300: "",
    400: "",
    500: "",
    600: "",
    700: "#1A8DD9",
    800: "",
    900: "",
  },
  secondaryGreen: {
    50: "",
    100: "",
    200: "",
    300: "",
    400: "",
    500: "#7FBABD",
    600: "#65ACB0",
    700: "#437F82",
    800: "",
    900: "",
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme["colors"]> = {};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};

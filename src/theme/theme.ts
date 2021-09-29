import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools"
import "@fontsource/inter";
import "@fontsource/inter/900.css";
import "@fontsource/inter/600.css";

import { ContainerTheme, NavButtonTheme } from "./components.theme";


const styles = {
  global: () => ({
    "html, body": {
      color: "#393A3E",
      bgColor: 'brand.900',
      minH: '100%',
      h: '100%'
    },
    "html": {
      overflowX: "hidden",
      // overflowY: 'scroll'
    },
    "body, #root": {
      d: 'flex',
      flexDirection: 'column',
      h: '100%'
    },
    a: {
      color: "blue.500",
    },

  }),
}

const colors = {
  brand: {
    purple: '#7033CA',
    dark_gray: '#393A3E',
    light_gray: '#373739',
    700: "#E9EAF3",
    900: "#F3F4FD",
  },
}

const fonts = {
  heading: "Inter, sans-serf",
  body: "Inter, sans-serf",
}

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const components = {
  Container: ContainerTheme,
  NavButton: NavButtonTheme,
}

const breakpoints = createBreakpoints({
  xs: '0',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1200px'
})


export const theme = extendTheme({ config, colors, styles, fonts, components, breakpoints })
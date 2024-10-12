import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
    xxl: true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 390,
      tablet: 768,
      laptop: 1024,
      desktop: 1440,
      xxl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#FF6868",
      light: "#E6EFF5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    text: {
      primary: "#000",
      secondary: "#B1B1B1",
    },
  },
});

if (theme.components) {
  theme.components.MuiButton = {
    styleOverrides: {
      root: {
        boxShadow: "none",
        ":hover": {
          boxShadow: "none",
          background: theme.palette.primary.main,
        },
        [theme.breakpoints.down("xxl")]: {
          padding: "0.625",
        },
        [theme.breakpoints.down("desktop")]: {
          padding: "0.83vw",
        },
        [theme.breakpoints.down("laptop")]: {
          padding: "1.17vw",
        },
        [theme.breakpoints.down("tablet")]: {
          padding: "1.17vw",
        },
        [theme.breakpoints.down("mobile")]: {
          padding: "3.07vw",
        },
      },
      outlined: {
        ":hover": {
          color: "#fff",
        },
      },
      text: {
        ":hover": {
          color: "#fff",
        },
      },
    },
  };
}

export { theme };

import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export enum Color {
  PRIMARY = "#ffc400",
  SECONDARY = "#ff4d4d",
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: Color.PRIMARY,
      contrastText: "#ffffff",
    },
    secondary: {
      main: Color.SECONDARY,
    },
    text: {
      primary: "#292929",
    },
  },
  typography: {
    fontFamily: ["Catamaran"].join(","),
    h1: { fontSize: "3rem", fontWeight: 900, marginBottom: "0.5rem" },
    h2: { fontSize: "2.75rem", fontWeight: 900, marginBottom: "0.5rem" },
    h3: { fontSize: "2.25rem", fontWeight: 900, marginBottom: "0.5rem" },
    h4: { fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" },
    h5: { fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" },
    h6: { fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" },
    subtitle1: { fontSize: "1.5rem", marginBottom: "0.5rem" },
    subtitle2: { fontSize: "1.25rem", marginBottom: "0.5rem" },
    body1: { fontSize: "1.5rem", lineHeight: 1.5, marginBottom: "0.5rem" },
    body2: { fontSize: "1.25rem", lineHeight: 1.6, marginBottom: "0.5rem" },
  },
  overrides: {
    MuiTextField: {
      root: {
        marginBottom: "0.5rem",
      },
    },
  },
});

export default responsiveFontSizes(theme, { breakpoints: ["sm", "md", "lg", "xl"] });

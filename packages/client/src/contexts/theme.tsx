import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";

export const l2pDarkBlue = "#171038";
export const l2pDarkBlue2 = "#110159";
export const l2pLightBlue = "#50b0f1";
export const l2ppink = "#e966a2";
export const l2pbackgroundblue = "#464c70";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: l2pLightBlue,
      main: l2ppink,
      dark: "#fff",
      contrastText: l2pDarkBlue,
    },
    divider: "#ffff",
    text: {
      primary: "#ffff",
      secondary: l2pLightBlue,
      disabled: "#ffff",
    },
  },
});

export const ThemeProvider = (props: any) => {
  return <MuiThemeProvider theme={theme} {...props} />;
};

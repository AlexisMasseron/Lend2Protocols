import { CssBaseline } from "@material-ui/core";
import { ReactQueryProvider } from "./react-query";
import { ThemeProvider } from "./theme";
import { Web3Provider } from "./web3";

export function AppProviders(props: any) {
  return (
    <ThemeProvider>
      <CssBaseline />
      <ReactQueryProvider>
        <Web3Provider>{props.children}</Web3Provider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

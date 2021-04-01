import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Homepage } from "screens/homepage";
import { AppBar } from "components/app-bar";
import { useMetaMask } from "metamask-react";
import { MetaMaskUnavailable } from "screens/metamask-unavailable";
import { GlobalLoading } from "screens/global-loading";
import { Login } from "screens/login";
import { ContentLayout } from "components/content-layout";
import { l2pbackgroundblue } from "contexts/theme";
import background from "assets/lendingPage.png";
import { LandingPage } from "screens/landing-page";

function App() {
  const { status } = useMetaMask();
  return status === "connected" ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

function UnauthenticatedApp() {
  return (
    <div>
      <LandingPage />
    </div>
  );
}

function AuthenticatedApp() {
  return (
    <Router>
      <div
        style={{
          backgroundColor: l2pbackgroundblue,
          position: "absolute",
          padding: 0,
          margin: 0,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <AppBar />
        <ContentLayout>
          <Switch>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </ContentLayout>
      </div>
    </Router>
  );
}

export { App };

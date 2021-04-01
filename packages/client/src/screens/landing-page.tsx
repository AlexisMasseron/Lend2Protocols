import { Box, makeStyles, Link, Grid } from "@material-ui/core";
import background from "assets/lendingPage.png";
import { MetaMaskUnavailable } from "screens/metamask-unavailable";
import { GlobalLoading } from "screens/global-loading";
import { useMetaMask } from "metamask-react";
import { Login } from "screens/login";

const useStyles = makeStyles((theme) => {
  return {
    background: {
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      position: "absolute",
      padding: 0,
      margin: 0,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
    centerBox: {
      marginTop: "10vh",
      marginBottom: "10vh",
      float: "left",
      marginLeft: "24vh",
      borderColor: "#FFFFF",
    },
    linkElement: {
      color: "#FFFFFF",
      fontFamily: "Bebas Neue",
      fontSize: 20,
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  };
});

export function LandingPage() {
  const classes = useStyles();
  const { connect, status } = useMetaMask();
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();
  return (
    <div className={classes.background}>
      <Grid container direction="row" justify="center">
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            borderBottom={1}
          >
            <Link
              href="#"
              onClick={preventDefault}
              className={classes.linkElement}
            >
              Learn
            </Link>
            <Link
              href="#"
              onClick={preventDefault}
              className={classes.linkElement}
            >
              Blog
            </Link>
            <Link
              href="#"
              onClick={preventDefault}
              className={classes.linkElement}
            >
              FAQ
            </Link>
            <Link
              href="#"
              onClick={preventDefault}
              className={classes.linkElement}
            >
              Team
            </Link>
            <Link
              href="#"
              onClick={preventDefault}
              className={classes.linkElement}
            >
              Governance
            </Link>
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            {status === "connecting" || status === "initializing" ? (
              <GlobalLoading />
            ) : (
              <Login connect={connect} />
            )}
          </Box>
        </Grid>
        {status === "unavailable" && <MetaMaskUnavailable />}
      </Grid>
    </div>
  );
}

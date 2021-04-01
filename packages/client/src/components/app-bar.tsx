import {
  AppBar as MuiAppBar,
  makeStyles,
  Toolbar,
  Grid,
  Typography,
} from "@material-ui/core";
import { Address } from "./address";
import { l2pDarkBlue } from "contexts/theme";
import logo from "assets/l2p_logo.png";
import background from "assets/backgroundl2p.png";

const useStyles = makeStyles(() => {
  return {
    appBar: {
      background: l2pDarkBlue,
      backgroundImage: `url(${background})`,
    },
    logoContainer: {
      flexGrow: 1,
      margin: "10px",
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      letterSpacing: "8px",
      fontWeight: 700,
      textShadow: "1px 1px 1px white",
      fontFamily: "Bebas Neue",
    },
  };
});

export function AppBar() {
  const classes = useStyles();
  return (
    <MuiAppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item xs={1}>
            <div className={classes.logoContainer}>
              <img src={logo} alt="L2P-logo" />
            </div>
          </Grid>
          <Grid item container xs={10} justify="center">
            <Typography
              color="textPrimary"
              variant="h4"
              component="h4"
              className={classes.title}
            >
              L2P.Finance
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Address />
          </Grid>
        </Grid>
      </Toolbar>
    </MuiAppBar>
  );
}

import * as React from "react";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import background from "assets/backgroundl2p.png";
import whiteList from "constants/whiteList.json";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedIn";
import InfoOutlined from "@material-ui/icons/InfoOutlined";

const useStyles = makeStyles((theme) => {
  return {
    borrowersWhitelistContainer: {
      height: "100%",
      flex: 1,
      padding: `${theme.spacing(3)}px ${theme.spacing(6)}px`,
      display: "flex",
      backgroundImage: `url(${background})`,
    },
    titleContainer: {
      marginBottom: theme.spacing(2),
    },
    title: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(1),
    },
  };
});

export function BorrowersWhitelist() {
  const classes = useStyles();

  return (
    <Paper
      className={classes.borrowersWhitelistContainer}
      variant="elevation"
      elevation={10}
    >
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          alignItems="center"
          className={classes.titleContainer}
        >
          <AssignmentTurnedInOutlinedIcon fontSize="large" />
          <Typography
            variant="h5"
            component="h5"
            color="inherit"
            className={classes.title}
          >
            My Borrowers
          </Typography>
          <Tooltip title="Authorize protocols to borrow thanks to your deposit">
            <InfoOutlined fontSize="small" />
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormGroup>
              {whiteList.map((protocol) => {
                return (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={protocol.default}
                        name={protocol.name}
                        color="primary"
                      />
                    }
                    label={protocol.name}
                    key={protocol.name}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
}

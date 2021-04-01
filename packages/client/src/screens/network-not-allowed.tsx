import { Box, makeStyles, Typography } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles((theme) => {
  return {
    centerBox: {
      flex: 1,
      marginTop: theme.spacing(8),
    },
    networkNotAllowedTitle: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  };
});

export function NetworkNotAllowed() {
  const classes = useStyles();
  return (
    <Box
      className={classes.centerBox}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <WarningIcon fontSize="large" color="error" />
      <Typography
        variant="h5"
        component="h5"
        color="error"
        className={classes.networkNotAllowedTitle}
      >
        Please switch to the Kovan network as we only support this network for
        now
      </Typography>
      <WarningIcon fontSize="large" color="error" />
    </Box>
  );
}

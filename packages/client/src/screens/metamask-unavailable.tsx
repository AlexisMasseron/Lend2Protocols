import { Box, makeStyles, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(() => {
  return {
    centerBox: {
      display: "flex",
      justifyContent: "center",
      marginTop: "10vh",
    },
  };
});

export function MetaMaskUnavailable() {
  const classes = useStyles();
  return (
    <Box className={classes.centerBox}>
      <Alert variant="filled" severity="warning">
        Oh no, you will need MetaMask to use this application :(
      </Alert>
    </Box>
  );
}

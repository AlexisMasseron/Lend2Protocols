import { Box, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => {
  return {
    centerBox: {
      display: "flex",
      marginTop: "2vh",
      marginRight: "10vh",
    },
  };
});

export function GlobalLoading() {
  const classes = useStyles();
  return (
    <Box className={classes.centerBox}>
      <CircularProgress />
    </Box>
  );
}

import { Box, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    centerBox: {
      marginTop: "10vh",
      marginBottom: "10vh",
      float: "left",
      marginLeft: "24vh",
      borderColor: "#FFFFF",
    },
    connectButton: {
      marginTop: theme.spacing(3),
      marginRight: theme.spacing(4),
    },
  };
});

interface LoginProps {
  connect: () => Promise<string[] | null>;
}
export function Login({ connect }: LoginProps) {
  const classes = useStyles();
  return (
    <Box>
      <Button
        className={classes.connectButton}
        onClick={connect}
        variant="contained"
        color="primary"
        size="small"
      >
        Connect your wallet
      </Button>
    </Box>
  );
}

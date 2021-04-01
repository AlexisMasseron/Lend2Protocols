import { Typography, Box, makeStyles, Button } from "@material-ui/core";
import { Asset } from "constants/assets";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    successMessageContainer: {
      flex: 1,
    },
    emojis: {
      fontSize: "2rem",
      margin: `0 ${theme.spacing(2)}px`,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1),
    },
    successMessage: {
      fontSize: "1rem",
      fontWeight: 700,
      marginTop: theme.spacing(4),
    },
    newDepositButton: {
      marginBottom: theme.spacing(2),
    },
  };
});

interface SuccessMessageProps {
  amount: string;
  asset: Asset;
  isWithdraw: boolean;
  restart: () => void;
}
export function SuccessMessage({
  amount,
  asset,
  isWithdraw,
  restart,
}: SuccessMessageProps) {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      className={classes.successMessageContainer}
    >
      <Box display="flex" justifyContent="center">
        <Typography className={classes.emojis} noWrap>
          🌟
        </Typography>
        <Typography className={classes.successMessage}>
          You have successfully{" "}
          {isWithdraw
            ? `withdrawn your ${asset}`
            : `delegated ${amount} ${asset} to l2p.finance`}{" "}
        </Typography>
        <Typography className={classes.emojis} noWrap>
          🌟
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="right">
        <Button
          variant="contained"
          color="primary"
          onClick={restart}
          className={classes.newDepositButton}
        >
          Make a new deposit
        </Button>
      </Box>
    </Box>
  );
}

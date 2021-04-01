import { Grid, makeStyles } from "@material-ui/core";
import { BorrowersWhitelist } from "components/borrowers-whitelist";
import { DepositStepper } from "components/deposit-stepper";
import { DepositTable } from "components/deposit-table";
import { useIsNetworkAllowed } from "contexts/web3";
import { NetworkNotAllowed } from "./network-not-allowed";
import { useMetaMask } from "metamask-react";

const useStyles = makeStyles((theme) => {
  return {
    depositContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    depositStepperContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
  };
});

export function Homepage() {
  const classes = useStyles();
  const isNetworkAllowed = useIsNetworkAllowed();
  const { account } = useMetaMask();

  if (!isNetworkAllowed) {
    return <NetworkNotAllowed />;
  }


  return (
    <Grid item container sm={12} justify="space-between">
      <Grid item md={1} />
      <Grid
        item
        container
        sm={12}
        md={10}
        className={classes.depositStepperContainer}
      >
        <DepositStepper key={account} />
      </Grid>
      <Grid item md={1} />
      <Grid
        item
        container
        sm={12}
        md={12}
        className={classes.depositContainer}
        justify="center"
      >
        <Grid item md={8} sm={12}>
          <DepositTable />
        </Grid>
        <Grid item md={1} />
        <Grid item md={3} sm={12}>
          <BorrowersWhitelist />
        </Grid>
      </Grid>
    </Grid>
  );
}

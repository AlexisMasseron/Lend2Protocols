import * as React from "react";
import {
  makeStyles,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import { DepositForm } from "components/deposit-form";
import { DelegateForm } from "components/delegate-form";
import { SuccessMessage } from "components/success-message";
import { Asset } from "constants/assets";
import { stepReducer, initialState } from "./reducer";
import { AuthorizeForm } from "components/authorize-form";
import background from "assets/backgroundl2p.png";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";

const useStyles = makeStyles((theme) => {
  return {
    depositContainer: {
      flex: 1,
      padding: `${theme.spacing(3)}px ${theme.spacing(6)}px`,
      display: "flex",
      flexDirection: "column",
      backgroundImage: `url(${background})`,
    },
    stepper: {
      marginTop: theme.spacing(4),
      backgroundColor: "transparent",
    },
    stepComponentContainer: {
      marginTop: theme.spacing(5),
      height: "80px",
      backgroundColor: "transparent",
    },
  };
});

const steps = [
  "Authorize L2P to transfer my tokens",
  "Delegate my borrow rights to L2P",
  "Deposit my tokens on Aave",
];

function useStepper() {
  const [state, dispatch] = React.useReducer(stepReducer, initialState);

  const onAuthorizeSuccess = (amount: string, asset: Asset) =>
    dispatch({
      type: "authorized",
      payload: {
        amount,
        asset,
      },
    });
  const onDelegateSuccess = (amount: string, asset: Asset) =>
    dispatch({
      type: "delegated",
      payload: {
        amount,
        asset,
      },
    });
  const onDepositSuccess = (amount: string, asset: Asset) =>
    dispatch({
      type: "deposited",
      payload: {
        amount,
        asset,
      },
    });

  const restart = () =>
    dispatch({
      type: "restarted",
    });

  return {
    state,
    onAuthorizeSuccess,
    onDelegateSuccess,
    onDepositSuccess,
    restart,
  };
}

export function DepositStepper() {
  const classes = useStyles();

  const {
    state,
    onAuthorizeSuccess,
    onDelegateSuccess,
    onDepositSuccess,
    restart,
  } = useStepper();

  const StepComponent =
    state.step === 0 ? (
      <AuthorizeForm goToNextStep={onAuthorizeSuccess} />
    ) : state.step === 1 ? (
      <DelegateForm
        goToNextStep={onDelegateSuccess}
        amount={state.amount}
        asset={state.asset}
        restart={restart}
      />
    ) : state.step === 2 ? (
      <DepositForm
        goToNextStep={onDepositSuccess}
        amount={state.amount}
        asset={state.asset}
        restart={restart}
      />
    ) : state.step === 3 ? (
      <SuccessMessage
        amount={state.amount}
        asset={state.asset}
        isWithdraw={false}
        restart={restart}
      />
    ) : null;

  return (
    <Paper
      className={classes.depositContainer}
      variant="elevation"
      elevation={10}
    >
      <Grid item xs={12}>
        <Grid container direction="row" spacing={2} align-items="center">
          <Grid item>
            <AccountBalanceWalletIcon fontSize="large" />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="h5">
              Deposit on L2P
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Stepper
        activeStep={state.step}
        alternativeLabel
        className={classes.stepper}
      >
        {steps.map((stepLabel) => (
          <Step key={stepLabel}>
            <StepLabel>{stepLabel}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        className={classes.stepComponentContainer}
        display="flex"
        alignItems="flex-end"
      >
        {StepComponent}
      </Box>
    </Paper>
  );
}

import * as React from "react";
import { makeStyles, Stepper, Step, StepLabel, Box } from "@material-ui/core";
import { SuccessMessage } from "components/success-message";
import { Asset } from "constants/assets";
import { stepReducer, initialState } from "./reducer";
import { ApproveForm } from "components/approve-form";
import { WithdrawForm } from "components/withdraw-form";
import background from "assets/backgroundl2p.png";

const useStyles = makeStyles((theme) => {
  return {
    depositContainer: {
      flex: 1,
      position: "relative",
      padding: `${theme.spacing(3)}px ${theme.spacing(6)}px`,
      display: "flex",
      flexDirection: "column",
      backgroundImage: `url(${background})`,
    },
    stepComponentContainer: {
      height: "80px",
      backgroundColor: "transparent",
    },
    stepper: {
      backgroundImage: `url(${background})`,
    },
  };
});

const steps = ["Approve aDai transfer", "Withdraw my deposit"];

function useStepper() {
  const [state, dispatch] = React.useReducer(stepReducer, initialState);
  const onApprovalSuccess = () => dispatch({ type: "approved" });
  const onWithdrawalSuccess = (amount: string, asset: Asset) =>
    dispatch({ type: "withdrawn", payload: { amount, asset } });
  const restart = () =>
    dispatch({
      type: "restarted",
    });

  return {
    state,
    onApprovalSuccess,
    onWithdrawalSuccess,
    restart,
  };
}

interface WithdrawStepperProps {
  closeModal: () => void;
}
export function WithdrawStepper({ closeModal }: WithdrawStepperProps) {
  const classes = useStyles();

  const { state, onApprovalSuccess, onWithdrawalSuccess } = useStepper();

  const StepComponent =
    state.step === 0 ? (
      <ApproveForm goToNextStep={onApprovalSuccess} closeModal={closeModal} />
    ) : state.step === 1 ? (
      <WithdrawForm
        goToNextStep={onWithdrawalSuccess}
        closeModal={closeModal}
      />
    ) : state.step === 2 ? (
      <SuccessMessage
        amount={state.amount}
        asset={state.asset}
        isWithdraw={true}
        restart={closeModal}
      />
    ) : null;

  return (
    <div className={classes.depositContainer}>
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
      <Box className={classes.stepComponentContainer} display="flex">
        {StepComponent}
      </Box>
    </div>
  );
}

import * as React from "react";
import { Box, Button, CircularProgress, makeStyles } from "@material-ui/core";
import { useMutation } from "react-query";
import { useContract } from "utils/contracts";
import { ethers } from "ethers";
import { A_DAI_CONTRACT_KEY, L2P_POOL_ADDRESS } from "constants/contracts";

const useStyles = makeStyles((theme) => {
  return {
    delegateForm: {
      flex: 1,
      display: "flex",
      alignItems: "center",
    },
    buttonsContainer: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
    },
    skipButton: {
      marginLeft: theme.spacing(1),
    },
    submitContainer: {
      width: "100px",
      marginRight: theme.spacing(2),
    },
    restartButton: {
      marginRight: theme.spacing(2),
    },
  };
});

interface ApproveFormProps {
  goToNextStep: () => void;
  closeModal: () => void;
}

export function ApproveForm({ goToNextStep, closeModal }: ApproveFormProps) {
  const classes = useStyles();

  const aDaiContract = useContract(A_DAI_CONTRACT_KEY);

  const { mutate, isLoading } = useMutation(
    () => {
      const amount = "100000";

      const amountInWeiBN = ethers.utils.parseUnits(amount, "18");
      return aDaiContract
        ?.approve(L2P_POOL_ADDRESS, amountInWeiBN)
        .then((tx: ethers.ContractTransaction) => tx.wait());
    },
    {
      onSuccess: () => {
        goToNextStep();
      },
    }
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mutate();
  };

  return (
    <Box className={classes.buttonsContainer} display="flex">
      <Button onClick={closeModal} className={classes.restartButton}>
        Cancel
      </Button>
      <Box
        display="flex"
        alignItems="flex-end"
        className={classes.submitContainer}
      >
        {isLoading ? (
          <CircularProgress size={36} />
        ) : (
          <Button variant="contained" color="primary" onClick={handleClick}>
            Approve
          </Button>
        )}
      </Box>
    </Box>
  );
}

import { Box, Button, CircularProgress, makeStyles } from "@material-ui/core";
import { useMutation, useQueryClient } from "react-query";
import { useContract } from "utils/contracts";
import { ethers, utils } from "ethers";
import React from "react";
import axios from "axios";
import { useMetaMask } from "metamask-react";
import { Asset } from "constants/assets";
import { L2P_POOL_KEY } from "constants/contracts";

interface Delegator {
  address: string;
  amount: number;
}

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
    cancelButton: {
      marginRight: theme.spacing(2),
    },
  };
});

async function withdraw(
  l2pPool: ethers.Contract | null,
  address: string | null
) {
  if (!l2pPool || !address) return;

  // 1. Fetch using API in order to get params
  const { data } = await axios.get<Delegator[]>(
    `http://18.218.17.175:4000/rebalance/${utils.getAddress(address)}`,
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
  const delegatorsAddresses: string[] = data.map((d) => d.address);
  const delegatorsAmounts: number[] = data.map((d) => d.amount);

  // 2. call method on l2pPool with params and wait for tx to be mined
  return l2pPool
    ?.withdraw(delegatorsAddresses, delegatorsAmounts)
    .then((tx: ethers.ContractTransaction) => tx.wait());
}

interface WithdrawFormProps {
  goToNextStep: (amount: string, asset: Asset, isWithdraw: boolean) => void;
  amount?: string;
  asset?: Asset;
  closeModal: () => void;
}

export function WithdrawForm({ goToNextStep, closeModal }: WithdrawFormProps) {
  const classes = useStyles();

  const l2pPool = useContract(L2P_POOL_KEY);
  const { account } = useMetaMask();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    () => {
      return withdraw(l2pPool, account);
    },
    {
      onSuccess: () => {
        goToNextStep("10", Asset.dai, true);
        queryClient.invalidateQueries(["deposits"]);
      },
    }
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mutate();
  };

  return (
    <Box className={classes.buttonsContainer} display="flex">
      <Button onClick={closeModal} className={classes.cancelButton}>
        Cancel
      </Button>
      <Box
        display="flex"
        alignItems="center"
        className={classes.submitContainer}
      >
        {isLoading ? (
          <CircularProgress size={36} />
        ) : (
          <Button variant="contained" color="primary" onClick={handleClick}>
            Withdraw
          </Button>
        )}
      </Box>
    </Box>
  );
}

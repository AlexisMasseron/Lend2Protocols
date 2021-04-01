import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  TextField,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { ethers } from "ethers";
import { Asset } from "constants/assets";
import { useContract } from "utils/contracts";
import { L2P_POOL_KEY } from "constants/contracts";

const useStyles = makeStyles((theme) => {
  return {
    depositForm: {
      flex: 1,
      display: "flex",
      alignItems: "center",
    },
    amountTextField: {
      flex: 1,
    },
    assetFormControl: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      minWidth: 200,
    },
    buttonsContainer: {
      marginLeft: "auto",
    },
    skipButton: {
      marginLeft: theme.spacing(1),
    },
    submitContainer: {
      width: "100px",
    },
    restartButton: {
      marginRight: theme.spacing(2),
    },
  };
});

interface FormInterface {
  amount: string;
  asset: Asset;
}

interface DepositFormProps {
  goToNextStep: (amount: string, asset: Asset) => void;
  amount?: string;
  asset?: Asset;
  restart: () => void;
}
export function DepositForm({
  goToNextStep,
  amount,
  asset,
  restart,
}: DepositFormProps) {
  const classes = useStyles();

  const { register, handleSubmit } = useForm<FormInterface>({
    defaultValues: {
      amount,
      asset,
    },
  });

  const queryClient = useQueryClient();
  const l2pPool = useContract(L2P_POOL_KEY);

  const { mutate, isLoading } = useMutation(
    ({ amount }: FormInterface): Promise<void> => {
      return l2pPool
        ?.delegate(amount)
        .then((tx: ethers.ContractTransaction) => tx.wait());
    },
    {
      onSuccess: (_, { amount, asset }) => {
        goToNextStep(amount, asset);
        queryClient.invalidateQueries(["deposits"]);
      },
    }
  );

  const onSubmit = (data: FormInterface) => mutate(data);
  return (
    <form className={classes.depositForm} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant="outlined"
        id="deposit-amount"
        name="amount"
        label="Deposit Amount"
        type="number"
        inputRef={register({ required: true })}
      />
      <FormControl variant="outlined" className={classes.assetFormControl}>
        <InputLabel htmlFor="deposit-asset">Asset</InputLabel>
        <Select
          native
          inputRef={register({ required: true })}
          label="Asset"
          inputProps={{
            name: "asset",
            id: "deposit-asset",
          }}
        >
          <option aria-label="None" value="" />
          <option value={Asset.dai}>DAI</option>
          <option disabled value={Asset.eth}>
            ETH
          </option>
        </Select>
      </FormControl>
      <Box className={classes.buttonsContainer} display="flex">
        <Button onClick={restart} className={classes.restartButton}>
          Restart
        </Button>
        <Box
          display="flex"
          alignItems="center"
          className={classes.submitContainer}
        >
          {isLoading ? (
            <CircularProgress size={36} />
          ) : (
            <Button type="submit" variant="contained" color="primary">
              Deposit
            </Button>
          )}
        </Box>
      </Box>
    </form>
  );
}

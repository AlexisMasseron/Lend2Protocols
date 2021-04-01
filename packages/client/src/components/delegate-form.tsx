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
import { useMutation } from "react-query";
import { Asset } from "constants/assets";
import { ethers } from "ethers";
import {
  DAI_STABLE_DEBT_TOKEN_CONTRACT_KEY,
  L2P_POOL_ADDRESS,
} from "constants/contracts";
import { useContract } from "utils/contracts";

const useStyles = makeStyles((theme) => {
  return {
    delegateForm: {
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
      marginRight: theme.spacing(2),
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

interface DelegateFormProps {
  goToNextStep: (amount: string, asset: Asset) => void;
  amount?: string;
  asset?: Asset;
  restart: () => void;
}
export function DelegateForm({
  goToNextStep,
  amount,
  asset,
  restart,
}: DelegateFormProps) {
  const classes = useStyles();

  const { register, handleSubmit } = useForm<FormInterface>({
    defaultValues: {
      amount,
      asset,
    },
  });
  const daiStableDebtTokenContract = useContract(
    DAI_STABLE_DEBT_TOKEN_CONTRACT_KEY
  );

  const { mutate, isLoading } = useMutation(
    ({ amount }: FormInterface) => {
      const amountInWeiBN = ethers.utils.parseUnits(amount, "18");
      return daiStableDebtTokenContract
        ?.approveDelegation(L2P_POOL_ADDRESS, amountInWeiBN)
        .then((tx: ethers.ContractTransaction) => tx.wait());
    },
    {
      onSuccess: (_, { amount, asset }) => {
        goToNextStep(amount, asset);
      },
    }
  );

  const onSubmit = (data: FormInterface) => mutate(data);
  return (
    <form className={classes.delegateForm} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant="outlined"
        id="delegate-amount"
        name="amount"
        label="Delegate Amount"
        type="number"
        inputRef={register({ required: true })}
      />
      <FormControl variant="outlined" className={classes.assetFormControl}>
        <InputLabel htmlFor="delegate-asset">Asset</InputLabel>
        <Select
          native
          inputRef={register({ required: true })}
          label="Asset"
          inputProps={{
            name: "asset",
            id: "delegate-asset",
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
              Delegate
            </Button>
          )}
        </Box>
      </Box>
    </form>
  );
}

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  Select,
  TextField,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Asset } from "constants/assets";
import { ethers } from "ethers";
import { DAI_CONTRACT_KEY, L2P_POOL_ADDRESS } from "constants/contracts";
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
    },
  };
});

interface FormInterface {
  amount: string;
  asset: Asset;
  terms: string;
}

interface AuthorizeFormProps {
  goToNextStep: (amount: string, asset: Asset) => void;
}
export function AuthorizeForm({ goToNextStep }: AuthorizeFormProps) {
  const classes = useStyles();

  const { register, handleSubmit, control } = useForm<FormInterface>({
    defaultValues: {
      terms: "",
    },
  });
  const daiContract = useContract(DAI_CONTRACT_KEY);

  const { mutate, isLoading } = useMutation(
    ({ amount }: FormInterface) => {
      const amountInWeiBN = ethers.utils.parseUnits(amount, "18");

      return daiContract
        ?.approve(L2P_POOL_ADDRESS, amountInWeiBN)
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
      <Controller
        as={
          <FormControlLabel
            control={<Checkbox value="checked" color="primary" />}
            label="I accept the terms and conditions of l2p.finance"
          />
        }
        name="terms"
        type="checkbox"
        control={control}
        rules={{ required: true }}
      />
      <Box className={classes.buttonsContainer} display="flex">
        <Box
          display="flex"
          alignItems="center"
          className={classes.submitContainer}
        >
          {isLoading ? (
            <CircularProgress size={36} />
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Authorize
            </Button>
          )}
        </Box>
      </Box>
    </form>
  );
}

import * as React from "react";
import { ethers } from "ethers";
import {
  useContractStore,
  useIsNetworkAllowed,
  useProvider,
} from "contexts/web3";
import { useMetaMask } from "metamask-react";

interface ContractOptions {
  readOnly: boolean;
}
const defaultOptions: ContractOptions = {
  readOnly: false,
};
export function useContract(
  key: string,
  { readOnly }: ContractOptions = defaultOptions
) {
  const provider = useProvider();
  const isNetworkAllowed = useIsNetworkAllowed();
  const { chainId } = useMetaMask();
  const contractStore = useContractStore();

  const contract = React.useMemo(() => {
    if (!provider) {
      throw new Error("`useContract` must be used with a proper provider");
    }

    const contractConfiguration = contractStore.contracts[key];

    if (!contractConfiguration) {
      throw new Error(
        `Unknown key ${key} given "useContract". Check that this key is properly set in the ContractStore.`
      );
    }

    if (!chainId) return null;
    const networkId = Number(chainId).toString();

    const networkNotAllowed =
      !isNetworkAllowed || !Boolean(contractConfiguration.addresses[networkId]);

    if (networkNotAllowed) {
      return null;
    }

    const readOnlyContract = new ethers.Contract(
      contractConfiguration.addresses[networkId],
      contractConfiguration.abi,
      provider
    );

    if (readOnly) return readOnlyContract;

    const signer = provider.getSigner();

    return readOnlyContract.connect(signer);
  }, [provider, contractStore, key, chainId, isNetworkAllowed, readOnly]);
  return contract;
}

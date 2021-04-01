import * as React from "react";
import { MetaMaskProvider, useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import { ContractStore } from "./contract-store";
import { IWeb3Context, Web3Context } from "./context";
import { abi as aaveProtocolDataProviderAbi } from "contracts/build/contracts/IProtocolDataProvider.json";
import { abi as daiContractAbi } from "contracts/build/contracts/IERC20.json";
import { abi as l2pPoolAbi } from "contracts/build/contracts/L2PPool.json";
import { abi as aavePoolAbi } from "contracts/build/contracts/ILendingPool.json";
import { abi as daiStableDebtTokenAbi } from "contracts/build/contracts/IStableDebtToken.json";
import {
  AAVE_POOL_ADDRESS,
  AAVE_POOL_KEY,
  AAVE_PROTOCOL_DATA_PROVIDER_ADDRESS,
  AAVE_PROTOCOL_DATA_PROVIDER_KEY,
  A_DAI_CONTRACT_ADDRESS,
  A_DAI_CONTRACT_KEY,
  DAI_CONTRACT_ADDRESS,
  DAI_CONTRACT_KEY,
  DAI_STABLE_DEBT_TOKEN_CONTRACT_ADDRESS,
  DAI_STABLE_DEBT_TOKEN_CONTRACT_KEY,
  L2P_POOL_ADDRESS,
  L2P_POOL_KEY,
} from "constants/contracts";
export * from "./hooks";
export * from "./contract-store";
export * from "./context";

const KOVAN_NETWORK_ID = "42";

const contractStore = new ContractStore({
  allowedNetworks: [KOVAN_NETWORK_ID],
  contracts: [
    {
      key: AAVE_PROTOCOL_DATA_PROVIDER_KEY,
      abi: aaveProtocolDataProviderAbi,
      addresses: { [KOVAN_NETWORK_ID]: AAVE_PROTOCOL_DATA_PROVIDER_ADDRESS },
    },
    {
      key: DAI_CONTRACT_KEY,
      abi: daiContractAbi,
      addresses: { [KOVAN_NETWORK_ID]: DAI_CONTRACT_ADDRESS },
    },
    {
      key: A_DAI_CONTRACT_KEY,
      abi: daiContractAbi,
      addresses: { [KOVAN_NETWORK_ID]: A_DAI_CONTRACT_ADDRESS },
    },
    {
      key: L2P_POOL_KEY,
      abi: l2pPoolAbi,
      addresses: { [KOVAN_NETWORK_ID]: L2P_POOL_ADDRESS },
    },
    {
      key: AAVE_POOL_KEY,
      abi: aavePoolAbi,
      addresses: { [KOVAN_NETWORK_ID]: AAVE_POOL_ADDRESS },
    },
    {
      key: DAI_STABLE_DEBT_TOKEN_CONTRACT_KEY,
      abi: daiStableDebtTokenAbi,
      addresses: { [KOVAN_NETWORK_ID]: DAI_STABLE_DEBT_TOKEN_CONTRACT_ADDRESS },
    },
  ],
});

export function Web3Provider(props: any) {
  return (
    <MetaMaskProvider>
      <Web3SubProvider contractStore={contractStore} {...props} />
    </MetaMaskProvider>
  );
}

function Web3SubProvider<
  Web3ProviderProps extends { contractStore: ContractStore }
>({ contractStore, ...otherProps }: Web3ProviderProps) {
  const metamaskState = useMetaMask();

  const { status, ethereum, chainId } = metamaskState;
  const provider = React.useMemo(() => {
    if (status !== "connected") return null;
    return new ethers.providers.Web3Provider(ethereum);
    // chainId is included as dependency because the provider does not support dynamic change of network
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, ethereum, chainId]);

  const value: IWeb3Context = React.useMemo(
    () => ({
      provider,
      contractStore,
      metamaskState,
    }),
    [provider, contractStore, metamaskState]
  );

  return <Web3Context.Provider value={value} {...otherProps} />;
}

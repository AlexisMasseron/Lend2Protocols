import * as React from "react";
import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import { IWeb3Context, Web3Context } from "./context";
import { ContractStore } from "./contract-store";

export function useWeb3(): IWeb3Context {
  const context = React.useContext(Web3Context);

  if (!context) {
    throw new Error("`useWeb3` should be used within a `Web3Provider`");
  }

  return context;
}

export function useProvider(): ethers.providers.Web3Provider | null {
  const { provider } = useWeb3();
  return provider;
}

export function useContractStore(): ContractStore {
  const { contractStore } = useWeb3();
  return contractStore;
}

export function useIsNetworkAllowed(): boolean {
  const contractStore = useContractStore();
  const { chainId } = useMetaMask();
  if (!chainId) return false;
  const networkId = Number(chainId).toString();
  return contractStore.allowedNetworks.includes(networkId);
}

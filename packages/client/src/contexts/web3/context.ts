import * as React from "react";
import { IMetaMaskContext } from "metamask-react/lib/metamask-context";
import { ethers } from "ethers";
import { ContractStore } from "./contract-store";

export interface IWeb3Context {
  provider: ethers.providers.Web3Provider | null;
  contractStore: ContractStore;
  metamaskState: IMetaMaskContext;
}
export const Web3Context = React.createContext<IWeb3Context | undefined>(
  undefined
);

import { ethers } from "ethers";

type ChainIdToAddressMap = Record<string, string>;
interface ContractConfiguration {
  abi: ethers.ContractInterface;
  addresses: ChainIdToAddressMap;
  key: string;
}
export interface ContractStoreConfiguration {
  allowedNetworks: string[];
  contracts?: ContractConfiguration[];
}

type ContractsRecord = Record<string, ContractConfiguration>;
export class ContractStore {
  allowedNetworks: string[];
  contracts: ContractsRecord;

  constructor({ allowedNetworks, contracts = [] }: ContractStoreConfiguration) {
    this.allowedNetworks = allowedNetworks;
    this.contracts = contracts.reduce((record, contractConfiguration) => {
      return {
        ...record,
        [contractConfiguration.key]: contractConfiguration,
      };
    }, {} as ContractsRecord);
  }
}

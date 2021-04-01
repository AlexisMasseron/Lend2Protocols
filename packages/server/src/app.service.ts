import { Injectable } from "@nestjs/common";
import { ethers, Wallet } from "ethers";
import * as abi from "contracts/build/contracts/L2PPool.json";
import { Delegator } from "./app.controller";

export interface Delegation {
  delegatorAddress: string;
  delegatedAmount: number;
  borrowedAmount: number;
}
@Injectable()
export class AppService {
  private provider;
  private ownerContract;
  private borrowerContract;

  constructor() {
    const {
      PROVIDER_URL,
      CONTRACT_ADDRESS,
      OWNER_PRIVATE_KEY,
      BORROWER_PRIVATE_KEY,
    } = process.env;
    if (
      !PROVIDER_URL ||
      !CONTRACT_ADDRESS ||
      !OWNER_PRIVATE_KEY ||
      !BORROWER_PRIVATE_KEY
    )
      throw new Error("Configuration Error");
    this.provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);

    // this is a first draft, designed to work with TestDelegations.sol test contract
    const owner = new Wallet(OWNER_PRIVATE_KEY, this.provider);
    this.ownerContract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, owner);

    const borrower = new Wallet(BORROWER_PRIVATE_KEY, this.provider);
    this.borrowerContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi.abi,
      borrower
    );
  }

  async getDelegations(): Promise<Delegation[]> {
    const delegations = [];
    try {
      const res = await this.ownerContract.getDelegations();
      const [addresses, delAmount, borAmount] = res;

      const delAddresses = addresses.filter(
        (address) => address !== "0x0000000000000000000000000000000000000000"
      );

      for (let i = 0; i < delAddresses.length; i++) {
        delegations.push({
          delegatorAddress: delAddresses[i],
          delegatedAmount: delAmount[i],
          borrowedAmount: borAmount[i],
        });
      }
    } catch (e) {
      console.log(
        `getDelegations failed while fetching delegations data from pool contract with error ${e}`
      );
    }

    return delegations;
  }

  async allow(address: string): Promise<void> {
    const res = await this.ownerContract.allow(address, {
      gasPrice: 100000000000,
      gasLimit: 1000000,
    });
    console.log(res);
  }

  async borrow(delegators: Delegator[]): Promise<void> {
    console.log(
      `Borrowing instructions for borrower with address ${await this.borrowerContract.signer.getAddress()} and amount ${delegators
        .map((d) => d.amount)
        .reduce((a, b) => a + b)}`
    );
    const addresses = delegators.map((d) => d.address);
    const amounts = delegators.map((d) => d.amount);
    await this.borrowerContract.borrow(addresses, amounts, {
      gasPrice: 100000000000,
      gasLimit: 1000000,
    });
  }

  async repay(delegators: Delegator[]): Promise<void> {
    console.log(
      `Repay instructions for borrower with address ${await this.borrowerContract.signer.getAddress()} and amount ${delegators
        .map((d) => d.amount)
        .reduce((a, b) => a + b)}`
    );
    console.log(JSON.stringify(delegators));
    const del = delegators.filter((de) => de.amount !== 0);
    const addresses = del.map((d) => d.address);
    const amounts = del.map((d) => d.amount);
    await this.borrowerContract.repay(addresses, amounts, {
      gasPrice: 100000000000,
      gasLimit: 1000000,
    });
  }
}

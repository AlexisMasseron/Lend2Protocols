import { Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { AppService, Delegation } from "./app.service";

export interface Delegator {
  address: string;
  amount: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    description:
      "Get instructions to rebalance input address debt to other delegators",
  })
  @Get("rebalance/:address")
  /**
   * Get instructions on how to rebalance the debt of the input delegator address
   * These instructions will be used on the frontend to call the withdraw method on the contract
   */
  async rebalance(@Param("address") address: string): Promise<Delegator[]> {
    let delegations: Delegation[] = await this.appService.getDelegations();
    // this is equivalent to a borrow, with the loan being the borrowed amount from the address to rebalance
    const toRebalance = delegations.find(
      (delegation) => delegation.delegatorAddress === address
    );
    if (!toRebalance) return [];
    delegations = delegations.filter((d) => d.delegatorAddress !== address);
    // sort by asc ratio
    const sorted = delegations
      .map((d) => {
        return {
          address: d.delegatorAddress,
          ratio: Number(d.borrowedAmount) / Number(d.delegatedAmount),
          delegated: Number(d.delegatedAmount) / 10 ** 18,
          borrowed: Number(d.borrowedAmount) / 10 ** 18,
        };
      })
      .sort((a, b) => {
        return a.ratio - b.ratio;
      });
    let toBorrow = Number(toRebalance.borrowedAmount) / 10 ** 18;
    const delegators: Delegator[] = [];
    // increase low ratios
    for (const delegator of sorted) {
      const capacity = delegator.delegated * 0.5 - delegator.borrowed;
      let borrowed = capacity;
      if (toBorrow > 0) {
        // if all amount is not dispatched and the next delegator has no capacity left, return empty array
        if (capacity === 0) {
          return [];
        }
        if (toBorrow < capacity) {
          borrowed = toBorrow;
        }
        delegators.push({
          address: delegator.address,
          amount: borrowed,
        });
      }
      toBorrow = toBorrow - borrowed;
    }
    // if not enough capacity left, return empty array
    if (toBorrow > 0) {
      return [];
    }
    return delegators;
  }

  @ApiOperation({
    description:
      "As the contract owner, allow a borrower to get funds from the pool",
  })
  @Post("allow/:address")
  /**
   * Allow a borrower to get funds from the platform as the smart contract owner
   */
  async allow(@Param("address") address: string): Promise<void> {
    await this.appService.allow(address);
  }

  @ApiOperation({
    description:
      "As a borrower, borrow an amount from the pool. The amount is spread amongst delegators",
  })
  @Post("borrow/:amount")
  /**
   * Borrow funds from pool as a borrower with the following algorithm :
   * - get delegations from contract
   * - sort delegators by ascending ratio
   * - max out ratios to sequentially until borrowing amount is reached
   * - call smart contract with instructions calculated before
   */
  async borrow(@Param("amount") amount: number): Promise<void> {
    const delegations: Delegation[] = await this.appService.getDelegations();

    // sort by asc ratio
    const sorted = delegations
      .map((d) => {
        return {
          address: d.delegatorAddress,
          ratio: Number(d.borrowedAmount) / Number(d.delegatedAmount),
          delegated: Number(d.delegatedAmount / 10 ** 18),
          borrowed: Number(d.borrowedAmount / 10 ** 18),
        };
      })
      .sort((a, b) => {
        return a.ratio - b.ratio;
      });
    let toBorrow = amount;
    const delegators: Delegator[] = [];
    console.log(JSON.stringify(sorted));
    // increase low ratios
    for (const delegator of sorted) {
      const capacity = delegator.delegated * 0.5 - delegator.borrowed;
      let borrowed = capacity;
      if (toBorrow > 0) {
        // if all amount is not dispatched and the next delegator has no capacity left, return empty array
        if (capacity === 0) {
          throw new Error("All capacity used");
        }
        if (toBorrow < capacity) {
          borrowed = toBorrow;
        }
        delegators.push({
          address: delegator.address,
          amount: borrowed,
        });
      }
      toBorrow = toBorrow - borrowed;
    }
    // if not enough capacity left, return empty array
    if (toBorrow > 0) {
      console.log("error not enough capacity");
    }
    await this.appService.borrow(delegators);
  }

  @ApiOperation({
    description:
      "As a borrower, repay debt to the pool. Repayed amounts are spread amongst delegators",
  })
  @Post("repay/:amount")
  /**
   * Repays debt as a borrower with the following algorithm :
   * - get delegations from contract
   * - sort delegators by descending ratio
   * - get ratios to zero sequentially until repayment amount is reached
   * - call smart contract with instructions calculated before
   */
  async repay(@Param("amount") amount: number): Promise<void> {
    const delegations: Delegation[] = await this.appService.getDelegations();
    // sort by desc ratio
    const sorted = delegations
      .map((d) => {
        return {
          address: d.delegatorAddress,
          ratio: Number(d.borrowedAmount) / Number(d.delegatedAmount),
          delegated: Number(d.delegatedAmount / 10 ** 18),
          borrowed: Number(d.borrowedAmount / 10 ** 18),
        };
      })
      .sort((a, b) => {
        return b.ratio - a.ratio;
      });
    let toRepay = amount;
    const delegators: Delegator[] = [];
    // decrease higher ratios
    for (const delegator of sorted) {
      if (toRepay > 0) {
        if (toRepay > delegator.borrowed) {
          delegators.push({
            address: delegator.address,
            amount: delegator.borrowed,
          });
          toRepay = toRepay - delegator.borrowed;
        } else {
          delegators.push({
            address: delegator.address,
            amount: toRepay,
          });
          toRepay = 0;
        }
      }
    }
    // if all delegators have not enough borrowed amount to repay, return empty array
    if (toRepay > 0) {
      throw new Error("Amount to repay too high");
    }
    await this.appService.repay(delegators);
  }
}

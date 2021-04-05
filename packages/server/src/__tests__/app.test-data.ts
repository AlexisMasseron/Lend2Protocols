import { Delegator } from "src/app.controller";
import { Delegation } from "src/app.service";

export const testAddress = "0xc5f7f349523cce4722458f2387189eeb";
export const unknownAddress = "0xff1f2f1a7aa77407b00f7c626eb52852";
export const testAmountToBorrow = 2000;
export const testAmountToRepay = 2000;
export const testExcessiveAmountToBorrow = 20000;
export const testExcessiveAmountToRepay = 20000;

export const testDelegation1 = {
  delegatorAddress: "0x4d928b216c149583639b33d1595a1762",
  delegatedAmount: 2000 * 10 ** 18,
  borrowedAmount: 0,
};

export const testDelegation2 = {
  delegatorAddress: "0xf404b925ff7c77cff70311da8d8ddcaf",
  delegatedAmount: 2000 * 10 ** 18,
  borrowedAmount: 1000 * 10 ** 18,
};

export const testDelegation3 = {
  delegatorAddress: "0xda0adf10b82413de643a807efb89cade",
  delegatedAmount: 10000 * 10 ** 18,
  borrowedAmount: 1000 * 10 ** 18,
};

export const testDelegationWhale = {
  delegatorAddress: "0xd4aa93c350b78db031d8e63dfc4b636d",
  delegatedAmount: 100000 * 10 ** 18,
  borrowedAmount: 10000 * 10 ** 18,
};

export const testDelegations: Delegation[] = [
  testDelegation1,
  testDelegation2,
  testDelegation3,
];
export const testDelegationsRebalance: Delegation[] = [
  testDelegation1,
  testDelegation2,
  testDelegation3,
  testDelegationWhale,
];

export const testDelegator1Borrow = {
  address: "0x4d928b216c149583639b33d1595a1762",
  amount: 1000,
};

export const testDelegator2Borrow = {
  address: "0xda0adf10b82413de643a807efb89cade",
  amount: 1000,
};

export const testDelegator3Repay = {
  address: "0xf404b925ff7c77cff70311da8d8ddcaf",
  amount: 1000,
};

export const testDelegator2Repay = {
  address: "0xda0adf10b82413de643a807efb89cade",
  amount: 1000,
};

export const testDelegatorsBorrow: Delegator[] = [
  testDelegator1Borrow,
  testDelegator2Borrow,
];
export const testDelegatorsRepay: Delegator[] = [
  testDelegator3Repay,
  testDelegator2Repay,
];

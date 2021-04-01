
const ethers = require('ethers');
const aaveProtocolDataProviderArtefact = artifacts.require('../contracts/AaveProtocolDataProvider.sol');
const lendingPoolArtefact = artifacts.require('../contracts/LendingPool.sol');
const stableDebtTokenArtefact = artifacts.require('../contracts/StableDebtToken.sol');

// Run this script with DELEGATOR address in truffle config

module.exports = async function flowNoFlaw () {
  console.log('Begin script - check debt of user');
  const aaveProtocolDataProviderAddress = '0x3c73A5E5785cAC854D468F727c606C07488a29D6';
  const reserveAddressDAI = '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD';
  const lendingPoolAddress2 = '0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe';
  const account3 = "0xe278D71Da246A5Aff65126EC62aDFA206c10F675";
  const account2 = "0x7B60BA9A84781AAC20C0751a4D3A8b3A4321D394";
  let aaveProtocolDataProvider;
  let lendingPool2;
  let stableDebtTokenDai;
  let debt = 0;

  const accountToRepay = account3;
  try {
    lendingPool2 = await lendingPoolArtefact.at(lendingPoolAddress2);
    aaveProtocolDataProvider = await aaveProtocolDataProviderArtefact.at(aaveProtocolDataProviderAddress);
    const res = await aaveProtocolDataProvider.getReserveTokensAddresses(reserveAddressDAI);
    stableDebtTokenDai = await stableDebtTokenArtefact.at(res.stableDebtTokenAddress);
  } catch (e) {
    console.log(e)
  }

  // Debt
  try {

    debt = await stableDebtTokenDai.principalBalanceOf(accountToRepay);
    console.log(`Debt of account: ${accountToRepay} is: ${debt}`);
  } catch (e) {
    console.log(e)
  }

  try{
    const decimals = '18';
    const amount = ethers.utils.parseUnits('21982.113', decimals);
    //await lendingPool2.repay(reserveAddressDAI, debt, 1, accountToRepay);
    await lendingPool2.withdraw(reserveAddressDAI, amount, accountToRepay);
    console.log("repaid")
    const newDebt = await stableDebtTokenDai.principalBalanceOf(accountToRepay);
    console.log(`Debt of account: ${accountToRepay} is: ${newDebt}`);
  } catch (e) {
    console.log(e)
  }
  console.log("End");
};


// ["0xe278D71Da246A5Aff65126EC62aDFA206c10F675"], [300]


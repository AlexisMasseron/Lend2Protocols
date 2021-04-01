
const ethers = require('ethers');
const lendingPoolArtefact = artifacts.require('../contracts/LendingPool.sol');
const aaveProtocolDataProviderArtefact = artifacts.require('../contracts/AaveProtocolDataProvider.sol');
const ERC20Artefact = artifacts.require('../contracts/ERC20.sol');

// Run this script with DELEGATOR address in truffle config

module.exports = async function flowNoFlaw () {
  console.log('Begin script - deposit DAI on Aave Pool.js');

  // Input: delegator
  const firstDelegator = '0x55Ff79F2A354ecA573bb4751562F61507E32A63c';
  
  const aaveProtocolDataProviderAddress = '0x3c73A5E5785cAC854D468F727c606C07488a29D6';
  const lendingPoolAddress2 = '0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe';
  const reserveAddressDAI = '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD';

  let lendingPool2;
  let aaveProtocolDataProvider;
  let dai;

  try {
  lendingPool2 = await lendingPoolArtefact.at(lendingPoolAddress2);
  aaveProtocolDataProvider = await aaveProtocolDataProviderArtefact.at(aaveProtocolDataProviderAddress);
  dai = await ERC20Artefact.at(reserveAddressDAI);
  } catch (e) {
    console.log(e)
  }

  // ------- DEPOSIT DAI -----------
  const decimals = '18';
  // If you want to deposit 10 DAI
  const amount = ethers.utils.parseUnits('1000', decimals);
  console.log("trying to deposit " + amount.toString() + " expressed in Wei");
  try {
    res = await dai.approve(lendingPoolAddress2, amount);
    console.log("approved");
  } catch (e) {
    console.log(e)
  }
  try {
    res = await lendingPool2.deposit(reserveAddressDAI, amount, firstDelegator, '0');
    console.log("deposit of " + amount + " DAI on main pool")
  } catch (e) {
    console.log(e)
  }

  // ------- GET USER RESERVE DATA -----------
  try {
    res = await aaveProtocolDataProvider.getUserReserveData(reserveAddressDAI, firstDelegator);
    console.log("address currently has " + res.currentATokenBalance + " aDAI");
  } catch (e) {
    console.log(e)
  }

  console.log("End");
};

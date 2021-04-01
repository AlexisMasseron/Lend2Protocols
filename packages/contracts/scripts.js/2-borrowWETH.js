
const ethers = require('ethers');
const lendingPoolArtefact = artifacts.require('../contracts/LendingPool.sol');
const { parseEther } = ethers.utils;

// Run this script with DELEGATEE address in truffle config

module.exports = async function flowNoFlaw () {
  console.log('Begin script - delegatee borrows WETH.js');

  // Main lendingPool address on Kovan - but not the same as the lending pool used by WETHGateway !
  // const lendingPoolAddress = '0x9FE532197ad76c5a68961439604C037EB79681F0';
  
  // lendingPool address associated to the WETHGateway where we deposited in step 1
  const lendingPoolAddress2 = '0xe0fba4fc209b4948668006b2be61711b7f465bae';

  const reserveAddressWETH = '0xd0A1E359811322d97991E03f863a0C30C2cF029C';

  // Input: delegator from step 1
  const delegator = '0x55Ff79F2A354ecA573bb4751562F61507E32A63c';
  // Input: delegatee from step 1
  const delegatee = '0x2844d58B9E822a7159d7dc38Ed265a459a712a55';

  let lendingPool2;

  try {
    lendingPool2 = await lendingPoolArtefact.at(lendingPoolAddress2);
  } catch (e) {
    console.log(e)
  }

  // -------- BORROW WITH DELEGATION ---------------
  const amountDelegated = parseEther('0.05');
  try {
    res = await lendingPool2.borrow(reserveAddressWETH, amountDelegated, '1', '0', delegator);
    console.log("borrow of " + amountDelegated + " WETH")
  } catch (e) {
    console.log(e)
  }

  // -------- CHECK BALANCE ---------------
  // To check your WETH balance, you can add the reserveAddressWETH in custom tokens in Metamask

  console.log("End");
};

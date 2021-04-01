
const ethers = require('ethers');
const lendingPoolArtefact = artifacts.require('../contracts/LendingPool.sol');
const ERC20Artefact = artifacts.require('../contracts/ERC20.sol');
const { parseEther } = ethers.utils;

// Run this script with DELEGATEE address in truffle config

module.exports = async function flowNoFlaw () {
  console.log('Begin script - delegatee borrows DAI.js');
  
  // lendingPool address
  const lendingPoolAddress2 = '0xe0fba4fc209b4948668006b2be61711b7f465bae';

  const reserveAddressDAI = '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD';

  // Input: delegator from step 1
  const delegator = '0x55Ff79F2A354ecA573bb4751562F61507E32A63c';
  // Input: delegatee from step 1
  const delegatee = '0x2844d58B9E822a7159d7dc38Ed265a459a712a55';

  let lendingPool2;
  let dai;

  try {
    lendingPool2 = await lendingPoolArtefact.at(lendingPoolAddress2);
    dai = await ERC20Artefact.at(reserveAddressDAI);
  } catch (e) {
    console.log(e)
  }

  // -------- BORROW WITH DELEGATION ---------------
  const amountDelegated = parseEther('1');
  try {
    res = await lendingPool2.borrow(reserveAddressDAI, amountDelegated, '1', '0', delegator);
    console.log("borrow of " + amountDelegated + " DAI")
  } catch (e) {
    console.log(e)
  }

  // -------- CHECK BALANCE ---------------
  // To check delegatee DAI balance, you can add the reserveAddressAave in custom tokens in Metamask
  try {
    res = await dai.balanceOf(delegatee);
    console.log("DAI balance of delegatee is " + res.toString());
  } catch (e) {
    console.log(e)
  }

  console.log("End");
};

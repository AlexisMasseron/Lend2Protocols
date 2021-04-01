
const ethers = require('ethers');
const stableDebtTokenArtefact = artifacts.require('../contracts/StableDebtToken.sol');
const { parseEther } = ethers.utils;

// Run this script with DELEGATOR address in truffle config

module.exports = async function flowNoFlaw () {
  console.log('Begin script - delegator delegates DAI.js');

  // Input: delegator
  const delegator = '0x55Ff79F2A354ecA573bb4751562F61507E32A63c';
  // Input: delegatee
  const delegatee = '0x2844d58B9E822a7159d7dc38Ed265a459a712a55';

  const stableDebtTokenAddressDAI = '0x3B91257Fe5CA63b4114ac41A0d467D25E2F747F3';

  let stableDebtTokenDAI;

  try {
    stableDebtTokenDAI = await stableDebtTokenArtefact.at(stableDebtTokenAddressDAI);
  } catch (e) {
    console.log(e)
  }

  // -------- DELEGATE ---------------
  const amountDelegated = parseEther('1000');
  try {
    res = await stableDebtTokenDAI.approveDelegation(delegatee, amountDelegated);
    console.log("delegation of " + amountDelegated + " DAI")
  } catch (e) {
    console.log(e)
  }

  // -------- CHECK DELEGATION ---------------
  try {
    res = await stableDebtTokenDAI.borrowAllowance(delegator, delegatee);
    console.log(res.toString());
  } catch (e) {
    console.log(e)
  }

  console.log("End");
};

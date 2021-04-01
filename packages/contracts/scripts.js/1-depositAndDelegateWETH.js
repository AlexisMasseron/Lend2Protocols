
const ethers = require('ethers');
const wETHGatewayArtefact = artifacts.require('../contracts/WETHGateway.sol');
const stableDebtTokenArtefact = artifacts.require('../contracts/StableDebtToken.sol');
const { parseEther } = ethers.utils;

// Run this script with DELEGATOR address in truffle config

module.exports = async function flowNoFlaw () {
  console.log('Begin script - delegator deposits and delegates WETH.js');

  // Input: delegator
  const delegator = '0x659E3140ee3495D23021D1eDA53Dc02aa6cDcBbF';
  // Input: delegatee
  const delegatee = '0x2844d58B9E822a7159d7dc38Ed265a459a712a55';

  const wETHGatewayAddress = '0xf8aC10E65F2073460aAD5f28E1EABE807DC287CF';
  const stableDebtTokenAddressWETH = '0x1F85D0dc45332D00aead98D26db0735350F80D18';

  let wETHGateway;
  let stableDebtTokenWETH;

  try {
    wETHGateway = await wETHGatewayArtefact.at(wETHGatewayAddress);
    stableDebtTokenWETH = await stableDebtTokenArtefact.at(stableDebtTokenAddressWETH);
  } catch (e) {
    console.log(e)
  }

  // ------- DEPOSIT ETHER -----------
  const amount = parseEther('0.1');
  let res;
  try {
    res = await wETHGateway.depositETH(delegator, 0, { value: amount});
    console.log("deposit of " + amount + " WETH")
  } catch (e) {
    console.log(e)
  }

  // -------- DELEGATE ---------------
  const amountDelegated = parseEther('0.05');
  try {
    res = await stableDebtTokenWETH.approveDelegation(delegatee, amountDelegated);
    console.log("delegation of " + amountDelegated + " WETH")
  } catch (e) {
    console.log(e)
  }

  // -------- CHECK DELEGATION ---------------
  try {
    res = await stableDebtTokenWETH.borrowAllowance(delegator, delegatee);
    console.log(res.toString());
  } catch (e) {
    console.log(e)
  }

  console.log("End");
};

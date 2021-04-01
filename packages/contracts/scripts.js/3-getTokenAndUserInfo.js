
const ethers = require('ethers');
const aaveProtocolDataProviderArtefact = artifacts.require('../contracts/AaveProtocolDataProvider.sol');
const stableDebtTokenArtefact = artifacts.require('../contracts/StableDebtToken.sol');
const { parseEther } = ethers.utils;

module.exports = async function flowNoFlaw () {
  console.log('Begin script - get token and user info.js');

  const aaveProtocolDataProviderAddress = '0x3c73A5E5785cAC854D468F727c606C07488a29D6';

  let delegator = '0x55Ff79F2A354ecA573bb4751562F61507E32A63c';

  let aaveProtocolDataProvider;

  try {
    aaveProtocolDataProvider = await aaveProtocolDataProviderArtefact.at(aaveProtocolDataProviderAddress);
  } catch (e) {
    console.log(e)
  }

  // -------- GET TOKEN/RESERVE ASSOCIATED ADDRESSES ---------------
  try {
    res = await aaveProtocolDataProvider.getAllReservesTokens();
    console.log("All reserves token available ");
    console.log(res);
  } catch (e) {
    console.log(e)
  }

  // This is how you get 

  let reserveAddressDAI = '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD';
  let reserveAddressWETH = '0xd0A1E359811322d97991E03f863a0C30C2cF029C';
  let reserveAddressAAVE = '0xB597cd8D3217ea6477232F9217fa70837ff667Af';

  try {
    res = await aaveProtocolDataProvider.getReserveTokensAddresses(reserveAddressDAI);
    console.log("contracts associated with DAI ");
    console.log(res);
    res = await aaveProtocolDataProvider.getReserveTokensAddresses(reserveAddressWETH);
    console.log("contracts associated with WETH ");
    console.log(res);
  } catch (e) {
    console.log(e)
  }

  // And here you get

  const aTokenAddressWETH = '0x87b1f4cf9BD63f7BBD3eE1aD04E8F52540349347';
  const stableDebtTokenAddressWETH = '0x1F85D0dc45332D00aead98D26db0735350F80D18';
  const variableDebtTokenAddressWETH = '0xDD13CE9DE795E7faCB6fEC90E346C7F3abe342E2';

  const aTokenAddressDAI = '0xdCf0aF9e59C002FA3AA091a46196b37530FD48a8';
  const stableDebtTokenAddress = '0x3B91257Fe5CA63b4114ac41A0d467D25E2F747F3';
  const variableDebtTokenAddress = '0xEAbBDBe7aaD7d5A278da40967E62C8c8Fe5fAec8';

  // -------- GET USER DATA ---------------
  try {
    res = await aaveProtocolDataProvider.getUserReserveData(reserveAddressWETH, delegator);
    console.log("aWETH balance from delegator is " + res.currentATokenBalance.toString());
    console.log("Current debt balance from delegator is " + res.currentStableDebt.toString());
  } catch (e) {
    console.log(e)
  }

  let stableDebtTokenWETH;

  // -------- CHECK DEBT BALANCE OF A USER ---------------
  try {
    stableDebtTokenWETH = await stableDebtTokenArtefact.at(stableDebtTokenAddressWETH);
    res = await stableDebtTokenWETH.balanceOf(delegator);
    console.log("Stable debt of delegator is " + res.toString());
  } catch (e) {
    console.log(e)
  }

  //-------- GET TOKEN/RESERVE DATA ---------------
  try {
    res = await aaveProtocolDataProvider.getReserveData(reserveAddressAAVE);
    console.log("Aave reserve data, availableLiquidity");
    console.log(res.availableLiquidity);
  } catch (e) {
    console.log(e)
  }

  console.log("End");
};


const ethers = require('ethers');
const stableDebtTokenArtefact = artifacts.require('../contracts/StableDebtToken.sol');
const aaveProtocolDataProviderArtefact = artifacts.require('../contracts/AaveProtocolDataProvider.sol');
const ATokenArtefact = artifacts.require('../contracts/AToken.sol');

const { parseEther } = ethers.utils;

module.exports = async function flowNoFlaw () {
  console.log('Begin script - get token and user info.js');

  const aaveProtocolDataProviderAddress = '0x3c73A5E5785cAC854D468F727c606C07488a29D6';

  let delegator = '0x55Ff79F2A354ecA573bb4751562F61507E32A63c';
  let delegatee = '0x2844d58B9E822a7159d7dc38Ed265a459a712a55'

  let reserveAddressDAI = '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD';
  let reserveAddressWETH = '0xd0A1E359811322d97991E03f863a0C30C2cF029C';
  let reserveAddressAAVE = '0xB597cd8D3217ea6477232F9217fa70837ff667Af';

  const aTokenAddressWETH = '0x87b1f4cf9BD63f7BBD3eE1aD04E8F52540349347';
  const stableDebtTokenAddressWETH = '0x1F85D0dc45332D00aead98D26db0735350F80D18';
  const variableDebtTokenAddressWETH = '0xDD13CE9DE795E7faCB6fEC90E346C7F3abe342E2';

  const aTokenAddressDAI = '0xdCf0aF9e59C002FA3AA091a46196b37530FD48a8';
  const stableDebtTokenAddress = '0x3B91257Fe5CA63b4114ac41A0d467D25E2F747F3';
  const variableDebtTokenAddress = '0xEAbBDBe7aaD7d5A278da40967E62C8c8Fe5fAec8';

  let stableDebtTokenWETH;
  let aaveProtocolDataProvider;

  // -------- CONTRACT ATOKEN ---------------
  try {
    aaveProtocolDataProvider = await aaveProtocolDataProviderArtefact.at(aaveProtocolDataProviderAddress);
    aToken = await ATokenArtefact.at(aTokenAddressDAI);
  } catch (e) {
    console.log(e)
  }

  // --------- GET LIQUIDITY INDEX ------------
  try {
    res = await aaveProtocolDataProvider.getReserveData(reserveAddressDAI);
    console.log("The liquidity index of your reserve is");
    console.log(res.liquidityIndex.toString());
  } catch (e) {
    console.log(e)
  }
   
  //-------- GET ATOKEN BALANCE NO INTEREST ---------------
  try {
    res = await aToken.balanceOf(delegatee);
    console.log("Your Aave AToken balance is");
    console.log(res.toString());
  } catch (e) {
    console.log(e)
  }
  try {
    res = await aToken.scaledBalanceOf(delegatee);
    console.log("Your Aave AToken balance is");
    console.log(res.toString());
  } catch (e) {
    console.log(e)
  }

  console.log("End");
};

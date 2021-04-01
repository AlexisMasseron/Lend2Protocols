
const ethers = require('ethers');
const ERC20Artefact = artifacts.require('../contracts/ERC20.sol');
const aaveProtocolDataProviderArtefact = artifacts.require('../contracts/AaveProtocolDataProvider.sol');

const stableDebtTokenArtefact = artifacts.require('../contracts/StableDebtToken.sol');

// Run this script with DELEGATOR address in truffle config

module.exports = async function flowNoFlaw () {
  console.log('Begin script - approve pool to allow deposit');

  const contractAddress = '0x572FAEbcbAd9E4BA8aB36e8bB814aD2db55f588d';
  const aaveProtocolDataProviderAddress = '0x3c73A5E5785cAC854D468F727c606C07488a29D6';
  const reserveAddressDAI = '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD';
  const aTokenAddressDAI = '0xdCf0aF9e59C002FA3AA091a46196b37530FD48a8';
  const amountToApprove = 500000
  const decimals = '18';
  let dai;

  let aaveProtocolDataProvider;

  try {
    aaveProtocolDataProvider = await aaveProtocolDataProviderArtefact.at(aaveProtocolDataProviderAddress);
  } catch (e) {
    console.log(e)
  }

  try {
    dai = await ERC20Artefact.at(reserveAddressDAI);
    aDai = await ERC20Artefact.at(aTokenAddressDAI);
  } catch (e) {
    console.log(e)
  }

  // ------- Approve -----------
  const amount = ethers.utils.parseUnits(`${amountToApprove}`, decimals);
  console.log("trying to approve " + amount.toString() + " expressed in Wei");
  try {
    await dai.approve(contractAddress, amount);
    await aDai.approve(contractAddress, amount);
    console.log("approved");
  } catch (e) {
    console.log(e)
  }

  // DELEGATE
  try {
    const decimals = '18';
    const amount = ethers.utils.parseUnits('5000', decimals);
    const res = await aaveProtocolDataProvider.getReserveTokensAddresses(reserveAddressDAI);
    const stableDebtTokenDai = await stableDebtTokenArtefact.at(res.stableDebtTokenAddress);
    await stableDebtTokenDai.approveDelegation(contractAddress, amount);
    console.log("delegated");
  } catch (e) {
    console.log(e)
  }

  console.log("End");
};


// ["0xe278D71Da246A5Aff65126EC62aDFA206c10F675"], [300]

// ["0x9747899450f5091446A077605cb9bc57073ba55a"], [5000]

// account 3 = "0xe278D71Da246A5Aff65126EC62aDFA206c10F675"
// account 2 = "0x7B60BA9A84781AAC20C0751a4D3A8b3A4321D394"
// accountDELE = 0x9747899450f5091446A077605cb9bc57073ba55a
// accountBORROW = 0x298a8928eb9fa09989f60BbE8698bb4D693b9D66
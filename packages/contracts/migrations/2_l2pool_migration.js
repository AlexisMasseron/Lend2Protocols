const L2PPool = artifacts.require("L2PPool");

module.exports = function(deployer) {
  deployer.deploy(L2PPool);
};

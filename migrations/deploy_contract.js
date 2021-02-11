const dapp = artifacts.require('./DappToken.sol')

module.exports = function(deployer) {
    deployer.deploy(dapp, 1000000);
};

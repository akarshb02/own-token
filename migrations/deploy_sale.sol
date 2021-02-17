var dtok = artifacts.require('./D_Token.sol');
var dsale = artifacts.require('./TokenSale.sol');

module.exports = function(deployer) {
    deployer.deploy(dtok, 10000).then(function() {

    });
    //token price 0.001 ether
    return deployer.deploy(dsale, dtok.address, 1000000000000000);

}

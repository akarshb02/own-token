const dapp = artifacts.require("./DappToken.sol")


contract('DappToken', function(accounts) {


    it("sets the totalSupply upon deployment", function() {
        return dapp.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, "set the totalsupply to 1000000")
        })
    })
})

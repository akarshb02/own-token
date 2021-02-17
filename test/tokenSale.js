var sale = artifacts.require('TokenSale.sol');

contract('TokenSale', function(accounts) {
    var tokenSaleInstance;
    var tokenPrice = 1000000000000000; //in wei (0.001 ether)
    var buyer = accounts[1];
    var numberOfTokens = 10;

    it('initializes the  contract with the correct values ', function() {
        return sale.deployed().then(function(instance) {
            tokenSaleInstance = instance;
            return tokenSaleInstance.address
        }).then(function(address) {
            assert.notEqual(address, 0x0, 'has contract address');
            return tokenSaleInstance.tokenContract();
        }).then(function(address) {
            assert.notEqual(address, 0x0, 'has tokencontract address');
            return tokenSaleInstance.tokenPrice();
        }).then(function(price) {
            assert.equal(price, tokenPrice, 'token price is correct');
        })
    })
    it('Purchasing a tokens ', function() {
        return sale.deployed().then(function(instance) {
            tokenSaleInstance = instance;

            var value = numberOfTokens * tokenPrice;
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: value });

        }).then(function(receipt) {

            //logs
            return tokenSaleInstance.tokenSold();
        }).then(function(amount) {
            assert.equal(amount.toNumber(), numberOfTokens, 'increments the number of tokens sold');

            //try to buy tokens different from ether value
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 }); //10 tokens foe 1 wei
        }).then(assert.fail).catch(function(error) {

            assert(error.message.indexOf('revert') >= 0, "msg.value must equals number of tokens in wei");
        })

    })
})

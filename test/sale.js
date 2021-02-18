var sale = artifacts.require('TokenSale.sol');
var dapp = artifacts.require('D_Token.sol');
contract('TokenSale', function(accounts) {
    var tokenInstaance;
    var tokenSaleInstance;
    var tokenPrice = 1000000000000000; //in wei (0.001 ether)
    var buyer = accounts[1];
    var admin = accounts[0];
    var tokensAvailable = 7500;
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
        return dapp.deployed().then(function(instance) {
                //Grab token instance
                tokenInstaance = instance;
                return tokenInstaance.transfer(tokenSaleInstance.address, tokensAvailable, { from: admin })
            }).then(function(receipt) {
                return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: numberOfTokens * tokenPrice });

            }).then(function(receipt) {

                //logs
                return tokenSaleInstance.tokenSold();
            }).then(function(amount) {
                assert.equal(amount.toNumber(), numberOfTokens, 'increments the number of tokens sold');
                return tokenSaleInstance.balanceOf(buyer);

            }).then(function(balance) {
                assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens)


                //try to buy tokens different from ether value
                return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: tokenPrice }) //10 tokens foe 1 wei
            })
            // }).then(assert.fail).catch(function(error) {
            //     assert(error.message.indexOf('revert') >= 0, "msg.value must equals number of tokens in wei")
            //     return tokenSaleInstance.buyTokens(8000, { from: buyer, value: numberOfTokens * tokenPrice })
            // }).then(assert.fail).catch(function(error) {
            //     assert(error.message.indexOf('revert') >= 0, "cann't purchase more tokens than available")
            // })
    })
})

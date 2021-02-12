const dapp = artifacts.require("./DappToken.sol")


contract('DappToken', function(accounts) {

    var tokenInstance;

    it('initialize the contract with the correct value', function() {
        return dapp.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            assert.equal(name, 'Universal Token', 'has the correct name');
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol, "UNI", 'has correct symbol');
            return tokenInstance.standard();

        }).then(function(standard) {
            assert.equal(standard, 'Universal Token v1.0', 'has the same standard');
        })
    })
    it("sets the totalSupply upon deployment", function() {
        return dapp.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, "set the totalsupply to 1000000");
            return tokenInstance.balanceOf(accounts[0])
        }).then(function(adminBalance) {
            assert.equal(adminBalance.toNumber(), 1000000, 'it allocats the initial supply to the admin');

        })
    });
    it('transfers tooken ownership', function() {
        return dapp.deployed().then(function(instance) {
            tokenInstance = instance;

            return tokenInstance.transfer.call(accounts[1], 99999999);
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
            return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
        }).then(function(receipt) {
            return tokenInstance.balanceOf(accounts[1]);

        }).then(function(balance) {
            assert.equal(balance.toNumber(), 250000, 'adds the amount to the receiver');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 750000, 'deducts the amount from the sending account');
        })
    })
    it('approval tokens for delegated transfer', function() {
        return dapp.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.approve.call(accounts[0], 100);
        }).then(function(success) {
            assert.equal(success, true, 'it returns true');
            return tokenInstance.approve(accounts[1], 100, { from: accounts[0] });
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Approval', 'should be the "Approval"event');
            assert.equal(receipt.logs[0].args._owner, accounts[0], 'logs the accounts the tokens are authorized by');
            assert.equal(receipt.logs[0].args._spender, accounts[1], 'logs the accounts the tokens are authorized to');
            assert.equal(receipt.logs[0].args._price, 100, 'logs the transfer amount');
            return tokenInstance.allowance(accounts[0], accounts[1]);
        }).then(function(allowance) {
            assert.equal(allowance.toString(), 100, 'stores the allowence for delegated transfer');
        })
    });
    it('handles delegated token transfers', function(instance) {
        return dapp.deployed().then(function(instance) {
            tokenInstance = instance;
            fromAccount = accounts[2];
            toAccount = accounts[3];
            spendingAccounts = accounts[4];

            //Transfer some tokens to fromAccounts

            return tokenInstance.transfer(fromAccount, 100, { from: accounts[0] });
        }).then(function(receipt) {

            return tokenInstance.approve(spendingAccounts, 10, { from: fromAccount });

        }).then(function(receipt) {
            //Try transfering 
            return tokenInstance.transferFrom(fromAccount, toAccount, 9999, { from: spendingAccounts });
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'cannot transfer larger than balance');
        })

    })
})

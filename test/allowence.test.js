var dapp = artifacts.require('D_Token.sol');

it('initializes the contract with correct values', function() {
    return dapp.deployed().then(function(instanace) {
        tokenInstance = instanace;
        return tokenInstance.name();
    }).then(function(name) {
        assert.equal(name, 'D_Token', 'has a correct name');
        return tokenInstance.symbol();
    }).then(function(symbol) {
        assert.equal(symbol, 'Dap', 'has a correct symbol');
    })
})

contract('D_Token', function(accounts) {

    it('sets the total supply up on deployment', function() {

        return dapp.deployed().then(function(instance) {

            tokenInstance = instance;
            return tokenInstance.totalSupply();

        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 10000, "set the total supply properly");


            return tokenInstance.balanceOf(accounts[0]);

        }).then(function(AdminBal) {
            assert.equal(AdminBal.toNumber(), 10000, 'it allocates the initial supply to the admin');
        })
    })


    it('transfer tokens ownership', function() {
        return dapp.deployed().then(function(instance) {
            tokenInstance = instance;

            return tokenInstance.transfer.call(accounts[0], 100000);
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, "error must contains revert");
            return tokenInstance.transfer.call(accounts[0], 2500, { from: accounts[0] });
        }).then(function(success) {
            assert.equal(success, true, 'it returns true');
            return tokenInstance.transfer(accounts[1], 2500, { from: accounts[0] });
        }).then(function(receipt) {

            // assert.equal(receipt.logs.length, 1, 'triggers one event');
            // assert.equal(receipt.logs[0].event, 'Transfer', 'should be the Transfer event');

            // //assert.ok(receipt.logs[0].args._from, accounts[0], 'logs the account the Tokens are Transfer From');
            // assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the Tokens are Transfer to');
            // assert.equal(receipt.logs[0].args._price, 2500, 'logs the transfer amt');





            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 2500, 'adds the amt to receving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 7500, 'detects the amt from the sending act');
        })
    })

    it('it approves for deligated transfer', function() {
        return dapp.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.approve.call(accounts[1], 100);
        }).then(function(success) {
            assert.equal(success, true, 'it returns true');

            return tokenInstance.approve(accounts[1], 100, { from: accounts[0] });
        }).then(function(receipt) {
            //logs of approval
            // assert.equal(receipt.logs.length, 1, 'triggers one event');
            // assert.equal(receipt.logs[0].event, 'Approval', 'should be the Transfer event');

            // assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the Tokens are Transfer From');
            // assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the Tokens are Transfer to');
            // assert.equal(receipt.logs[0].args._price, 2500, 'logs the transfer amt');

            return tokenInstance.allowence(accounts[0], accounts[1]);


        }).then(function(allowence) {
            assert.equal(allowence.toNumber(), 100, 'stores allowence');
        })
    })

    it('handles delegated token transfer', function() {
        return dapp.deployed().then(function(instance) {
            tokenInstance = instance;
            fromAccount = accounts[2];
            toAccount = accounts[3];
            spendingAccount = accounts[4];

            return tokenInstance.transfer(fromAccount, 100, { from: accounts[0] });
        }).then(function(receipt) {

            //Approving spendind accounts

            return tookenInstance.approve(spendingAccount, 10, { from: fromAccount })

        }).then(function(recript) {
            //TRY TRANSFERING MORE THEN BALANCE
            return tokenInstance.transferFrom(fromAccount, toAccount, 1000, { from: spendingAccount });
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'cannot transfer larger then balance');
        })
    })

})

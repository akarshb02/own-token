
App = {
    web3Provider: null,
   

    init: function() {
        console.log("App initalized...");
        return App.initWeb3();
    },
    initWeb3: function() {
        if (typeof web3 !== 'undefined') {
         
          App.web3Provider = web3.currentProvider;
          web3 = new Web3(web3.currentProvider);
        } else {
         
          App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
          web3 = new Web3(App.web3Provider);
        }
        return App.initContracts();
    },
    initContracts: function() {
        $.getJSON("TokenSale.json", function(tokenSale) {
          App.contracts.tokenSale = TruffleContract(tokenSale);
          App.contracts.TokenSale.setProvider(App.web3Provider);
          App.contracts.tokenSale.deployed().then(function(tokenSale) {
            console.log("Token Sale Address:", tokenSale.address);
          });
         

 $(function() {
$(window).on('load', function() {
        App.init();
    })
});

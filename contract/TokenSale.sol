pragma solidity ^0.7.4;
import "./D_Token.sol";

contract TokenSale {
address admin;
D_Token public tokenContract;
uint public tokenPrice;
uint public tokenSold;


constructor(D_Token _tokenContract,uint _tokenPrice){

admin = msg.sender;
tokenContract = _tokenContract;
tokenPrice =_tokenPrice;

   }
   //multipple function

   function multiple(uint x,uint y) internal pure returns(uint z) {
        require(y==0 || (z =x * y)/y==x);
   }

   //Buying Tokens

   function buyTokens(uint _numberOfTokens) public payable {

      require(msg.value == multiple(_numberOfTokens , tokenPrice),"must have proper wei to buy tokens");

     //keep track of no of tokens sold
     tokenSold += _numberOfTokens; 
    

   }
 }

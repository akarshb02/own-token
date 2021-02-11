pragma solidity^0.7.4;

contract DappToken {
 uint public totalSupply;
 
 mapping(address=>uint) public balanceOf;

 constructor(uint _initialSupply) public {
     totalSupply =  _initialSupply;
  }

}

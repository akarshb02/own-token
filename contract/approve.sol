pragma solidity^0.7.4;

contract DappToken {

  string public name= "Universal Token";
  string public symbol = "UNI";
  string public standard = 'Universal Token v1.0';
  uint public totalSupply;

    //allowance

  
 
 event Transfer(
   address indexed _from,
   address indexed _to,
   uint _price
 );

 //approve
 event Approval(
    address indexed _owner,
    address indexed _spender,
    uint _price
 );
 mapping(address=>uint) public balanceOf;
 mapping(address=>mapping(address=>uint)) public allowance;

 constructor(uint _initialSupply) public {
    balanceOf[msg.sender]=_initialSupply;
     totalSupply =  _initialSupply;
  
}
//Transfer
//Exception if accounts doesn't have enough
//return bool
//Transfer Event
function transfer(address _to,uint _price) public returns(bool success){

    require(balanceOf[msg.sender] >= _price);
    balanceOf[msg.sender] -= _price;
    balanceOf[_to] += _price; 
emit 
    Transfer(msg.sender, _to,_price);
       return true;
  }

  //Delegated Transfer
  //approve fun

function approve(address _spender,uint _price)public returns(bool success) {

    allowance[msg.sender][_spender]=_price;
    Approval(msg.sender, _spender, _price);
      return true;

}

  //transferFrom

  function transferFrom(address _from,address _to,uint _price) public returns (bool success){
      require(_price <= balanceOf[_from]);
  }


}

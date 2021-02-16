pragma solidity^0.7.4;

contract D_Token {
uint public totalSupply;
string public name = 'D_Token';
string public symbol = 'Dap';
mapping(address => uint)public balanceOf;

//allowence
mapping(address=>mapping(address=>uint))public allowence;

event Transfer(
 address indexed_from,
 address indexed_to,
 uint price


);

event Approval(
 address indexed_owner,
 address indexed_spender,
 uint _price
);

 constructor(uint _totalSupply) {

  balanceOf[msg.sender] = _totalSupply;
    totalSupply = _totalSupply;
    //allocate the initial supply
 }

 function transfer(address _to,uint _price) public returns (bool success) {
     require(balanceOf[msg.sender] >= _price,'not enough');
    
     balanceOf[msg.sender] -= _price;
     balanceOf[_to] += _price;

     emit Transfer(msg.sender, _to, _price);

      return true;
 }

 function approve(address _spender,uint _price) public returns(bool scuccess) {
   //sets allowence

   allowence[msg.sender][_spender] = _price;
   //approve event
   emit Approval(msg.sender,_spender, _price);
  return true;
 }
 function transferFrom(address _from,address _to,uint _price) public returns (bool success) {
    require(_price <= balanceOf[_from]);
 }
}

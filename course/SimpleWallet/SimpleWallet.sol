pragma solidity ^0.8.3;

contract SimpleWallet {
    
    function withdrawMoney(address payable to, uint amount) public {
        to.transfer(amount);
    }
    
    receive() external payable {

    }
}
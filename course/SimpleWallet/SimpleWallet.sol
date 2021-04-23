pragma solidity ^0.8.3;

contract SimpleWallet {
    
    address owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(owner == msg.sender, "You are not allowed");
        _;
    }
    
    function withdrawMoney(address payable to, uint amount) public onlyOwner {
        
        to.transfer(amount);
    }
    
    receive() external payable {

    }
}


pragma solidity ^0.8.3;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract SimpleWallet is Ownable {
    
    mapping(address => uint) public allowance;
    
    function addAllowance(address who, uint amount) public onlyOwner {
        allowance[who] = amount;
    }
    
    modifier ownerOrAllowed(uint amount) {
        require(isOwner() || allowance[msg.sender] >= amount, "You are not allowed");
        _;
    }
    
    function isOwner() internal view returns(bool) {
        return owner() == msg.sender;
    }
    
    function reduceAllowance(address who, uint amount) internal {
        allowance[who] -= amount;
    }

    function withdrawMoney(address payable to, uint amount) public ownerOrAllowed(amount) {
        require(amount <= address(this).balance, "There are not enough founds stored in the smart contract");
        if(!isOwner()) {
            reduceAllowance(msg.sender, amount);
        }
        to.transfer(amount);
    }
    
    receive() external payable {

    }
}

 
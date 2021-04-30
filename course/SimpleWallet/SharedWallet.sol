pragma solidity ^0.8.3;

import "./Allowance.sol";

contract SharedWallet is Allowance {
    
    event MoneySent(address indexed beneficiary, uint amount);
    event MoneyReceived(address indexed _from, uint amount);
    
    function withdrawMoney(address payable to, uint amount) public ownerOrAllowed(amount) {
        require(amount <= address(this).balance, "There are not enough founds stored in the smart contract");
        if(!isOwner()) {
            reduceAllowance(msg.sender, amount);
        }
        emit MoneySent(to, amount);
        to.transfer(amount);
    }
    
    receive() external payable {
        emit MoneyReceived(msg.sender, msg.value);
    }
}
pragma solidity ^0.8.3;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Allowance is Ownable {
    
    event AllowanceChanged(address who, address fromWhom, uint oldAmount, uint newAmount);
    
    mapping(address => uint) public allowance;
    
    function addAllowance(address who, uint amount) public onlyOwner {
        emit AllowanceChanged(who, msg.sender, allowance[who], amount);
        allowance[who] = amount;
    }
    
    function isOwner() internal view returns(bool) {
        return owner() == msg.sender;
    }
    
    modifier ownerOrAllowed(uint amount) {
        require(isOwner() || allowance[msg.sender] >= amount, "You are not allowed");
        _;
    }
    
    function reduceAllowance(address who, uint amount) internal {
        emit AllowanceChanged(who, msg.sender, allowance[who], allowance[who] - amount);
        allowance[who] -= amount;
    }
    
    function renounceOwnership() public override onlyOwner {
        revert("can't renounceOwnership here"); //not possible with this smart contract
    }
}

contract SimpleWallet is Allowance {
    
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

 
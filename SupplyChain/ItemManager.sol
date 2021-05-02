pragma solidity ^0.8.3;

contract ItemManager {
    enum SupplyChainState {Created, Paid, Delivered}

    struct S_Item {
        string _identifier;
        uint256 _itemPrice;
        ItemManager.SupplyChainState _state;
    }

    mapping(uint256 => S_Item) public items;
    uint256 itemIndex;

    event SupplyChainStep(uint256 _itemIndex, uint256 _step);

    function createItem(string memory _identifier, uint256 _itemPrice) public {
        items[itemIndex]._identifier = _identifier;
        items[itemIndex]._itemPrice = _itemPrice;
        items[itemIndex]._state = SupplyChainState.Created;
        emit SupplyChainStep(itemIndex, uint256(items[itemIndex]._state));
        itemIndex++;
    }

    function triggerPayment(uint256 _itemIndex) public payable {
        require(
            items[_itemIndex]._itemPrice == msg.value,
            "Only full payments accepted"
        );
        require(
            items[_itemIndex]._state == SupplyChainState.Created,
            "Item is further in the chain"
        );
        items[_itemIndex]._state = SupplyChainState.Paid;
        emit SupplyChainStep(_itemIndex, uint256(items[_itemIndex]._state));
    }

    function triggerDelivery(uint256 _itemIndex) public {
        require(
            items[_itemIndex]._state == SupplyChainState.Paid,
            "Item is further in the chain"
        );
        items[_itemIndex]._state = SupplyChainState.Delivered;
        emit SupplyChainStep(_itemIndex, uint256(items[_itemIndex]._state));
    }
}

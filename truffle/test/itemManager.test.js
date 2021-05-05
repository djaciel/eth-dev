const ItemManager = artifacts.require('./ItemManager.sol');

contract('ItemManager', (accounts) => {
  it('Should be able to add an item', async () => {
    const itemManagerInstance = await ItemManager.deployed();
    const itemName = 'test1';
    const itemPrice = 500;
    const result = await itemManagerInstance.createItem(itemName, itemPrice, {
      from: accounts[0],
    });
    console.log('args', result.logs[0].args._itemIndex);
    assert.equal(result.logs[0].args._itemIndex, 0, `It's not the first item`);

    const item = await itemManagerInstance.items(0);
    console.log('item', item);
    assert.equal(item._identifier, itemName, 'The identifier was different');
  });
});

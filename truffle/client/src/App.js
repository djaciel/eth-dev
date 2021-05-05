import React, { Component } from 'react';
import ItemManagerContract from './contracts/ItemManager.json';
import ItemContract from './contracts/Item.json';
import getWeb3 from './getWeb3';

import './App.css';

class App extends Component {
  state = {
    loaded: false,
    cost: 0,
    itemName: 'example1',
  };

  componentDidMount = async () => {
    try {
      this.web3 = await getWeb3();

      this.accounts = await this.web3.eth.getAccounts();

      this.networkId = await this.web3.eth.net.getId();

      this.itemManager = new this.web3.eth.Contract(
        ItemManagerContract.abi,
        ItemManagerContract.networks[5777] &&
          ItemManagerContract.networks[5777].address
      );

      this.item = new this.web3.eth.Contract(
        ItemContract.abi,
        ItemContract.networks[5777] && ItemContract.networks[5777].address
      );

      this.listenToPaymentEvent();
      this.setState({ loaded: true });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  listenToPaymentEvent = () => {
    this.itemManager.events.SupplyChainStep().on('data', async (evt) => {
      console.log('first', evt);
      let itemObj = await this.itemManager.methods
        .items(evt.returnValues._itemIndex)
        .call();
      alert(`Item ${itemObj._identifier} was paid, deliver it now!`);
    });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async () => {
    const { cost, itemName } = this.state;
    let result = await this.itemManager.methods
      .createItem(itemName, cost)
      .send({ from: this.accounts[0] });

    console.log(result);
    alert(
      `Send ${cost} wei to ${result.events.SupplyChainStep.returnValues._itemAddress}`
    );
  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Event Trigger / Supply Chain Example</h1>
        <h2>Items</h2>
        <h2>Add Items</h2>
        Cost in wei:{' '}
        <input
          type="number"
          name="cost"
          value={this.state.cost}
          onChange={this.handleInputChange}
        />
        Item Identifier:{' '}
        <input
          type="text"
          name="itemName"
          value={this.state.itemName}
          onChange={this.handleInputChange}
        />
        <button type="button" onClick={this.handleSubmit}>
          Create new Item
        </button>
      </div>
    );
  }
}

export default App;

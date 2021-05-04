import React, { Component } from 'react';
import ItemManagerContract from './contracts/ItemManager.json';
import ItemContract from './contracts/Item.json';
import getWeb3 from './getWeb3';

import './App.css';

class App extends Component {
  state = { 
    loaded: false,
    cost: 0,
    itemName= "example1" 
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.itemManager = new web3.eth.Contract(
        ItemManagerContract.abi,
        ItemManagerContract.networks[5777] &&
          ItemManagerContract.networks[5777].address
      );

      this.item = new web3.eth.Contract(
        ItemContract.abi,
        ItemContract.networks[5777] && ItemContract.networks[5777].address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ loaded: true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type = "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async () => {
    const { cost, itemName } = this.state;
    await this.itemManager.methods.createItem(itemName, cost).send({from: this.accounts[0]});
  }

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
        <input type="text" name="cost" value={this.state.cost} onchange={} />
        Item Identifier:{' '}
        <input
          type="text"
          name="itemName"
          value={this.state.itemName}
          onchange={}
        />
        <button type="button" onClick={this.handleSubmit}>
          Create new Item
        </button>
      </div>
    );
  }
}

export default App;

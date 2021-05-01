const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

web3.eth
  .call({
    from: '0xA8E676EB0B5B7d52f35E41b85f2a54507aE12dfB', // client address
    to: '0x1f36367BDf8E26d7472D359338c7e5340Da737cc', // smart contract address
    //data: '0x06540f7e', // hex encoded function signature (myUint get function)
    data: web3.utils.sha3('myUint()').substring(0, 10),
  })
  .then((res) => console.log(res));

// get the function hash name
const myUintHashName = web3.utils.sha3('myUint()');
console.log(myUintHashName);

const contract = new web3.eth.Contract(
  [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_myUint',
          type: 'uint256',
        },
      ],
      name: 'setUint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'myUint',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
  '0x1f36367BDf8E26d7472D359338c7e5340Da737cc'
);

//console.log(contract);

contract.methods
  .myUint()
  .call()
  .then((res) => console.log(res));

contract.methods
  .setUint(519)
  .send({
    from: '0xA8E676EB0B5B7d52f35E41b85f2a54507aE12dfB',
  })
  .then((res) => console.log(res));

const Web3 = require('web3');

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

web3.eth
  .getBalance('0x177C0E5E230946228F874C5fd51D7C087D0a5C18')
  .then((res) => console.log(web3.utils.fromWei(res, 'ether')));

web3.eth
  .sendTransaction({
    from: '0x177C0E5E230946228F874C5fd51D7C087D0a5C18',
    to: '0x91d1875b192E718A7eF6EB6bCBECFE297C98DEb4',
    value: web3.utils.toWei('1', 'ether'),
  })
  .then((res) => console.log(res));

import React, { Component } from 'react';
import Web3 from 'web3';
import Colour from '../abis/Colour.json';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    
    // state to define the display account address 
    // contract object
    // total supply of NFT's in smart contract
    // state of colours taken from supply data
    this.state = {
      account: 'undefined',
      contract: null,
      totalSupply: 0,
      colours: []
    }
  }

  // load web3 on mount of react component
  async componentDidMount() {
    await this.loadWeb3()
  }

  // load data from blockchain related to users wallet address
  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      this.loadBlockChainData();
    } else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      this.loadBlockChainData();
    } else {
      window.alert('ethereum is not available.');
    }
  }

  async loadBlockChainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    this.setState({ account: accounts[0]});
    // find the network id e.g. 4535435
    const networkId = await web3.eth.net.getId();
    // console.log(networkId);
    const networkData = Colour.networks[networkId];
    // if data found
    if(networkData){
      const abi = Colour.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      this.setState({ contract });
      const totalSupply = await contract.methods.totalSupply().call(); 
      console.log(totalSupply);
      for(var i = 0; i < totalSupply; i++) {
        const colour = await contract.methods.colours(i).call();
        // console.log(colour);
        const owner = await contract.methods.ownerOf(i + 1).call();
        // if match with this address is found
        // NOTE: If you want to show all remove this.
        if(this.state.account == owner) {
          this.setState({ colours: [...this.state.colours, colour] });
        }
      }
    } else {
      // did not work.
      window.alert('ethereum is not available.');
    }
  }

  mint = (colour) => {
    this.state.contract.methods.mint(colour).send({ from: this.state.account })
    .once('transactionHash', (hash) => { 
      console.log('hash', hash);
    })
    .once('receipt', (receipt) => { 
      console.log('receipt ', receipt);
    })
    .on('confirmation', (confNumber, receipt) => { 
      console.log('confirmation ', confNumber, receipt);
     })
    .on('error', (error) => { 
      console.log('err', error);
     })
    .then((receipt) => {
      console.log('receipt success ', receipt);
      this.setState({ colours: [...this.state.colours, colour] }) 
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark p-0 shadow">
          <div>
            <a
              className="navbar-brand col-sm-3 col-md-4 mr-0"
              href="http://www.dappuniversity.com/bootcamp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Colour Tokens
            </a>
          </div>
          <div
            className="navbar-brand col-sm-9 col-md-8 pull-right text-right">
            { this.state.account && this.state.account }
          </div>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1 style={{ margin: '14px 0', color: 'grey' }}>Issue Token</h1>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const colour = this.colour.value;
                  this.mint(colour);
                }}>
                  <input 
                    type="text"
                    className="form-control mb-1"
                    placeholder="e.g. #FFFFFF"
                    ref={(input) => { this.colour = input }}
                  ></input>
                  <input
                    type="submit"
                    className="btn btn-block btn-primary"
                    value="mint"
                  >
                  </input>
                </form>
              </div>
            </main>
            <div style={{ margin: '30px 0', display: 'flex', justifyContent: 'center' }} className="col-lg-12 text-center">
              {
                this.state.colours.length > 0 && this.state.colours.map(function(colour, i){
                  return <div><div key={i} style={{ backgroundColor: colour, width: '100px', height: '100px', borderRadius: '100px', border: '1px solid black',  margin: '18px' }}></div>{colour}</div>
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import './App.css';
import { loadWeb3, loadAccount, loadToken, loadExchange } from '../store/interactions'
import Navbar from './Navbar'
import Content from './Content'
import { contractsLoadedSelector } from '../store/selectors'

function App(props) {

  const loadBlockchainData = async () => {
    const web3 = await loadWeb3(props.dispatch)
    await web3.eth.net.getNetworkType()
    const networkId = await web3.eth.net.getId()
    await loadAccount(web3, props.dispatch)
    const token = await loadToken(web3, networkId, props.dispatch)
    if (!token) {
      window.alert('Token smart contract not detected on current network. Please select another network on Metamask.')
      return
    }
    const exchange = await loadExchange(web3, networkId, props.dispatch)
    if (!exchange) {
      window.alert('Exchange smart contract not detected on current network. Please select another network on Metamask.')
      return
    }
  }

  useEffect(() => {
    loadBlockchainData()
  })

  return (
    <div>
      <Navbar/>
      { props.contractsLoaded ? <Content/> : <div className="content"></div>}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    contractsLoaded: contractsLoadedSelector(state)
  }
}

export default connect(mapStateToProps)(App);

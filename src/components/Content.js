
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { accountSelector, exchangeSelector } from '../store/selectors'
import { loadAllOrders, subscribeToEvents } from '../store/interactions'
import Trades from './Trades'
import OrderBook from './OrderBook'
import MyTransactions from './MyTransactions'
import PriceChart from './PriceChart'
import Balance from './Balance'

function Content(props) {

  const loadBlockchainData = async () => {
    await loadAllOrders(props.exchange, props.dispatch)
    await subscribeToEvents(props.exchange, props.dispatch)
  }

  useEffect(() => {
    loadBlockchainData()
  })

  return (
    <div className="content">
      <div className="vertical-split">
        <Balance/>
        <div className="card bg-dark text-white">
          <div className="card-header">
            Card Title
          </div>
          <div className="card-body">
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="/#" className="card-link">Card link</a>
          </div>
        </div>
      </div>
      <OrderBook/>
      <div className="vertical-split">
        <PriceChart/>
        <MyTransactions/>
      </div>
      <Trades/>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    account:accountSelector(state),
    exchange:exchangeSelector(state)
  }
}

export default connect(mapStateToProps)(Content);

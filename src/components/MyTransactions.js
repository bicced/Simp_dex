
import React from 'react';
import { connect } from 'react-redux';
import {
  myFilledOrdersLoadedSelector,
  myFilledOrdersSelector,
  myOpenOrdersLoadedSelector,
  myOpenOrdersSelector,
  exchangeSelector,
  accountSelector,
  orderCancellingSelector
} from '../store/selectors'
import {cancelOrder} from '../store/interactions'
import { Tabs, Tab } from 'react-bootstrap'
import Spinner from './Spinner'

function MyTransactions(props) {

  const showMyFillOrders = () => {
    return (
      <tbody>
        { props.myFilledOrders.map((order) => {
          return (
            <tr key={order.id}>
              <th className="text=muted">{order.formattedTimestamp}</th>
              <th className={`text-${order.orderTypeClass}`}>{order.orderSign}{order.tokenAmount}</th>
              <th className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</th>
            </tr>
          )
        })}
      </tbody>
    )
  }

  const showMyOpenOrders = () => {

    return (
      <tbody>
        { props.myOpenOrders.map((order) => {
          return (
            <tr key={order.id}>
              <th className={`text-${order.orderTypeClass}`}>{order.tokenAmount}</th>
              <th className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</th>
              <th className="text=muted" onClick={(e) => {cancelOrder(props.dispatch, props.exchange, order, props.account)}}>X</th>
            </tr>
          )
        })}
      </tbody>
    )
  }

  return (
    <div className="card bg-dark text-white">
      <div className="card-header">
        My Transactions
      </div>
      <div className="card-body">
        <Tabs defaultActivityKey="trades" className="bg-dark text-white">
          <Tab eventKey="trades" title="Trades" className="bg-dark">
            <table className="table table-dark table-sm small">
              <thead>
                <th>TIME</th>
                <th>SIMP</th>
                <th>SIMP/ETH</th>
              </thead>
              {props.myFilledOrdersLoaded ? showMyFillOrders() : <Spinner type="table"/>}
            </table>
          </Tab>
          <Tab eventKey="orders" title="Orders" className="bg-dark">
            <table className="table table-dark table-sm small">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>DAPP/ETH</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              {props.myOpenOrdersLoaded ? showMyOpenOrders() : <Spinner type="table"/>}
            </table>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const myOpenOrdersLoaded = myOpenOrdersLoadedSelector(state)
  const orderCancelling = orderCancellingSelector(state)

  return {
    myFilledOrdersLoaded: myFilledOrdersLoadedSelector(state),
    myFilledOrders: myFilledOrdersSelector(state),
    myOpenOrdersLoaded: myOpenOrdersLoaded && !orderCancelling,
    myOpenOrders: myOpenOrdersSelector(state),
    exchange: exchangeSelector(state),
    account: accountSelector(state)
  }
}

export default connect(mapStateToProps)(MyTransactions);

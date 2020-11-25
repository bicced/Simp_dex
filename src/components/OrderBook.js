
import React from 'react';
import { connect } from 'react-redux';
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import { orderBookSelector, orderBookLoadedSelector, accountSelector, exchangeSelector, orderFillingSelector } from '../store/selectors'
import { fillOrder } from '../store/interactions'
import Spinner from './Spinner'

function OrderBook(props) {

  const renderOrder = (order) => {
    return (
      <OverlayTrigger key={order.id} placement='auto' overlay={<Tooltip id={order.id}>{`Click here to ${order.orderFillAction}`}</Tooltip>}>
        <tr key={order.id} className="order-book-order" onClick={(e) => fillOrder(props.dispatch, props.exchange, order, props.account)} >
          <td>{order.tokenAmount}</td>
          <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
          <td>{order.etherAmount}</td>
        </tr>
      </OverlayTrigger>
    )
  }

  const showOrderBook = () => {
    return(
      <tbody>
        {props.orderBook.sellOrders.map((order) => renderOrder(order))}
        <tr>
          <th>SIMP</th>
          <th>SIMP/ETH</th>
          <th>ETH</th>
        </tr>
        {props.orderBook.buyOrders.map((order) => renderOrder(order))}
      </tbody>
    )
  }

  return (
    <div className="vertical">
      <div className="card bg-dark text-white">
        <div className="card-header">
          Order Book
        </div>
        <div className="card-body order-book">
          <table className="table table-dark table-sm small">
            { props.showOrderBook ? showOrderBook() : <Spinner type="table"/>}
          </table>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const orderFilling = orderFillingSelector(state)

  return {
    orderBook: orderBookSelector(state),
    showOrderBook: orderBookLoadedSelector(state) && !orderFilling,
    account: accountSelector(state),
    exchange: exchangeSelector(state)
  }
}

export default connect(mapStateToProps)(OrderBook);

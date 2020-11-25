
import React from 'react';
import { connect } from 'react-redux';
import { accountSelector } from '../store/selectors'

function Navbar(props) {


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/#">Simp Orderbook Exchange</a>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href={`https://etherscan.io/address/${props.account}`}>{props.account}</a>
        </li>
      </ul>
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    account:accountSelector(state)
  }
}

export default connect(mapStateToProps)(Navbar);

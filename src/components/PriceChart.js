import React from 'react';
import { connect } from 'react-redux';
import Chart from 'react-apexcharts'
import Spinner from './Spinner'
import { chartOptions, dummyData } from './PriceChart.config'
import { priceChartLoadedSelector, priceChartSelector } from '../store/selectors';


function PriceChart(props) {

  const priceSymbol = (lastPriceChange) => {
    let output
    if (lastPriceChange === '+') {
      output = <span className="text-success">&#9650;</span>
    }
    else {
      output = <span className="text-danger">&#9660;</span>
    }
    return(output)
  }

  const showPriceChart = () => {
    return (
      <div className="price-chart">
        <div className="price">
          <h4>SIMP/ETH &nbsp; {priceSymbol(props.priceChart.lastPriceChange)} &nbsp; {props.priceChart.lastPrice}</h4>
        </div>
        <Chart options={chartOptions} series={props.priceChart.series} type='candlestick' width='100%' height='100%'/>
      </div>
    )
  }

  return (
    <div className="card bg-dark text-white">
      <div className="card-header">
        Price Chart
      </div>
      <div className="card-body">
        { props.priceChartLoaded ? showPriceChart() : <Spinner/>}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    priceChartLoaded: priceChartLoadedSelector(state),
    priceChart: priceChartSelector(state)
  }
}

export default connect(mapStateToProps)(PriceChart);

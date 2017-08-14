import React, {Component} from 'react'
import {Chart} from 'react-d3-core'
import {LineChart} from 'react-d3-basic'
import {connect} from 'react-redux'
import {fetchUsers} from '../store'
import rd3 from 'react-d3-library'
const RD3Component = rd3.component

class Line extends Component {

  constructor(props) {
    super(props)
    this.state = {
      width: 700,
      height: 300,
      margins: {
        left: 100, right: 100, top: 50, bottom: 50
      },
      title: 'User sample',
      chartSeries: [
        {
          field: 'age',
          name: 'age',
          color: '#ff7f0e'
        }
      ],
      x: function (d) {
        return +d.age
      }
    }
  }

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {
  const {margins, title, width, height, chartSeries, x, xLabel, data} = this.props

  return (
    <div className="container">
      <div className="lineChart">
      <LineChart
        showXGrid={false}
        showYGrid={false}
        margins={margins}
        title={title}
        data={data}
        width={width}
        height={height}
        chartSeries={chartSeries}
        x={x}
        xLabel = {xLabel}
      />
      </div>
      </div>
  )
  }
}

const mapState = ({users}, state, ownProps) => {
  const xFunc = data => data.id
  return ({
    title: 'No title specified',
    width: 700,
      height: 300,
      margins: {
        left: 100, right: 100, top: 50, bottom: 50
      },
      chartSeries: [
        {
          field: 'age',
          name: 'age',
          color: '#ff7f0e'
        },
        {
          field: 'id',
          name: 'id',
          color: '#7142f4',
          area: true
        }
      ],
      x: xFunc,
      xLabel: 'id',
      data: users
  })
}

const mapDispatch = dispatch => {
  return {
    fetchAllUsers() {
      dispatch(fetchUsers())
    }
  }
}

export default connect(mapState, mapDispatch)(Line)

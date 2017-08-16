import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store'
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts'

class LineGraph extends Component {

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {
  const {margins, width, height, lineType, dataKey, stroke, data, xdataKey, ydataKey} = this.props

  return (
    <div className="container">
      <div className="lineChart">
      <LineChart
        margins={margins}
        width={width}
        height={height}
        data={data}
      >
      <Line
        type={lineType}
        dataKey={dataKey}
        stroke={stroke}
        activeDot={{ stroke: 'blue', strokeWidth: 2, r: 5 }}
      />
      <CartesianGrid strokeDasharray="10 10" />
      <XAxis dataKey={xdataKey} />
      <YAxis dataKey={ydataKey} />
      <Tooltip />
      <Legend />
      </LineChart>
      </div>
      </div>
  )
  }
}

const mapState = (state, ownProps) => {
  return ({
      width: 700,
      height: 300,
      margins: {
        left: 100, right: 100, top: 50, bottom: 50
      },
      title: 'User sample',
      stroke: '#ff7f0e',
      lineType: 'monotone',
      dataKey: 'age',
      xdataKey: 'id',
      ydataKey: 'age',
      data: state.users
    })
}

const mapDispatch = dispatch => {
  return {
    fetchAllUsers() {
      dispatch(fetchUsers())
    }
  }
}

export default connect(mapState, mapDispatch)(LineGraph)

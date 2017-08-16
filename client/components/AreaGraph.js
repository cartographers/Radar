import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store'
import {AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts'

class AreaGraph extends Component {

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {
  const {margins, width, height, lineType, dataKey, stroke, data, xdataKey, ydataKey, fill} = this.props

  return (
    <div className="container">
      <div className="lineChart">
      <AreaChart
        margins={margins}
        width={width}
        height={height}
        data={data}
      >
      <Area
        type={lineType}
        dataKey={dataKey}
        stroke={stroke}
        activeDot={{ stroke: 'blue', strokeWidth: 2, r: 5 }}
        fill={fill}
      />
      <CartesianGrid strokeDasharray="10 10" />
      <XAxis dataKey={xdataKey} />
      <YAxis dataKey={ydataKey} />
      <Tooltip />
      <Legend />
      </AreaChart>
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
      stroke: '#ffc658',
      fill: '#ffc658',
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

export default connect(mapState, mapDispatch)(AreaGraph)

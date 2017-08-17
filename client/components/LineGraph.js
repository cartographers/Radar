import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchQueryTable} from '../store'

class LineGraph extends Component {
  componentDidMount () {
    const queryInfo = {
      currentDatabase: this.props.database,
      selectThese: this.props.selectThese,
      whereThese: this.props.whereThese,
      currentTable: this.props.table,
      orderedBy: this.props.orderBy,
      fields: this.props.fields
    }
    // this.props.fetchQueriedData(queryInfo)
  }

  render () {
    const {queriedTable, width, height, title, x, y, orderBy, whereThese} = this.props
    const graphData = queriedTable.map((row, index) => {
      return {name: row[x].slice(0, 4), y: row[y], sales: row['sales']}
    })
    return (
      <LineChart width={width} height={height} data={graphData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name" />
       <YAxis />
       <CartesianGrid strokeDasharray="3 3" />
       <Tooltip />
       <Legend />
       <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{r: 8}} />
      </LineChart>
    );
  }
}

const mapState = (state, ownProps) => {
  return ({
    title: ownProps.Title,
    width: ownProps.width,
    height: ownProps.height,
    x: ownProps.xAxis,
    y: ownProps.yAxis,
    orderBy: ownProps.orderedBy,
    whereThese: ownProps.whereThese,
    table: ownProps.currentTable,
    queriedTable: state.queriedTable,
    database: ownProps.currentDatabase,
    fields: state.fields
  })
}

const mapDispatch = (dispatch) => {
  return ({
    fetchQueriedData(queryInfo) {
      dispatch(fetchQueryTable(queryInfo))
    }
  })
}

export default connect(mapState, mapDispatch)(LineGraph)

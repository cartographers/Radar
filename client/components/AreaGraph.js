import React, {Component} from 'react'
import {fetchQueryTable} from '../store'
import {connect} from 'react-redux'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

class AreaGraph extends Component {

  componentDidMount () {
    const queryInfo = {
      currentDatabase: this.props.database,
      selectThese: this.props.selectThese,
      whereThese: this.props.whereThese,
      currentTable: this.props.table,
      orderBy: this.props.orderBy,
      fields: this.props.fields
    }
    this.props.fetchQueriedData(queryInfo)
  }

  render () {

    const {
      queriedTable,
      width,
      height,
      title,
      x,
      y,
      orderBy,
      whereThese
    } = this.props
    console.log(queriedTable)
    const graphData = queriedTable.map((row, index) => {
      return {x: row[x], y: row[y]}
    })

    return (
      <div className="col-md-6">
        <AreaChart
          width={width}
          height={height}
          data={graphData}
          margin={{top: 10, right: 30, left: 0, bottom: 0}}>

            <XAxis dataKey="x" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />

            <Area type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8" label />

        </AreaChart>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return ({
    title: ownProps.title,
    width: ownProps.width,
    height: ownProps.height,
    x: ownProps.x,
    y: ownProps.y,
    orderBy: ownProps.orderedBy,
    whereThese: ownProps.whereThese,
    table: ownProps.table,
    database: ownProps.database,
    fields: state.fields,
    queriedTable: state.queriedTable
  })
}

const mapDispatch = (dispatch) => {
  return ({
    fetchQueriedData(queryInfo) {
      dispatch(fetchQueryTable(queryInfo))
    }
  })
}

export default connect(mapState, mapDispatch)(AreaGraph)

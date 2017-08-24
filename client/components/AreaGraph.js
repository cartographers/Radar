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
  render () {

    const {
      width,
      height,
      title,
      x,
      y,
      savedQuery
    } = this.props

    return (
      <div className="col-md-6">
        <h4>{title}</h4>
        <AreaChart
          width={width}
          height={height}
          data={savedQuery}>

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
    x: ownProps.x,
    y: ownProps.y,
    orderBy: ownProps.orderedBy,
    whereThese: ownProps.whereThese,
    table: ownProps.table,
    database: ownProps.database,
    fields: state.fields,
    queriedTable: state.queriedTable,
    savedQuery: ownProps.savedQuery,
    height: ownProps.height,
    width: ownProps.width
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

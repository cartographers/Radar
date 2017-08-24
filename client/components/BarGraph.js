import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchQueryTable} from '../store'

class BarGraph extends Component {

  render () {

    const {
      strokeGrid,
      width,
      height,
      title,
      x,
      y,
      fill,
      savedQuery
    } = this.props

    return (
      <div className="col-md-6">
          <BarChart
            width={width}
            height={height}
            data={savedQuery} label>
            <XAxis dataKey={x} label minTickGap={10} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={y} fill={fill} name={title}/>
          </BarChart>
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
    orderedBy: ownProps.orderedBy,
    whereThese: ownProps.whereThese,
    table: ownProps.table,
    database: ownProps.database,
    fields: state.fields,
    queriedTable: state.queriedTable,
    savedQuery: ownProps.savedQuery,
    AndOr: ownProps.AndOr,
    fill: ownProps.fill,
    strokeGrid: ownProps.strokeGrid
  })
}
const mapDispatch = (dispatch) => {
  return ({
    fetchQueriedData(queryInfo) {
      dispatch(fetchQueryTable(queryInfo))
    }
  })
}
export default connect(mapState, mapDispatch)(BarGraph)


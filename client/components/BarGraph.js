import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchQueryTable} from '../store'

class BarGraph extends Component {

  componentDidMount () {
    const queryInfo = {
      currentDatabase: this.props.database,
      selectThese: this.props.selectThese,
      whereThese: this.props.whereThese,
      currentTable: this.props.table,
      orderedBy: this.props.orderedBy,
      fields: this.props.fields,
      AndOr: this.props.AndOr
    }
    // this.props.fetchQueriedData(queryInfo)
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
      whereThese,
      savedQuery
    } = this.props

    return (
      <div className="col-md-6">
        <div><h4>{title}</h4></div>
          <BarChart width={width} height={height} data={savedQuery} label>
            <XAxis dataKey={x} label />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey={y} fill="#82ca9d" label />
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
    AndOr: ownProps.AndOr
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


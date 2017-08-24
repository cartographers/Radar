import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchQueryTable} from '../store'

class ScatterGraph extends Component {

  componentDidMount () {
    const queryInfo = {
      currentDatabase: this.props.database,
      selectThese: this.props.selectThese,
      whereThese: this.props.whereThese,
      currentTable: this.props.table,
      orderBy: this.props.orderBy,
      fields: this.props.fields
    }
    // this.props.fetchQueriedData(queryInfo)
  }

  render () {

    const {
      title,
      x,
      y,
      strokeGrid,
      width,
      height,
      fill,
      savedQuery
    } = this.props
    const graphData = savedQuery.map((row, index) => {
      return {x: row[x], y: row[y]}
    })

    return (
      <div className="col-md-6">
          <ScatterChart
            width={width}
            height={height}>

            <XAxis dataKey="x" name={x} />
            <YAxis dataKey="y" name={y} />
            <Tooltip />
            <Legend />
            <Scatter name={title} data={graphData} fill={fill} label />
          </ScatterChart>
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
    strokeGrid: ownProps.strokeGrid,
    fill: ownProps.fill
  })
}

const mapDispatch = (dispatch) => {
  return ({
    fetchQueriedData(queryInfo) {
      dispatch(fetchQueryTable(queryInfo))
    }
  })
}

export default connect(mapState, mapDispatch)(ScatterGraph)

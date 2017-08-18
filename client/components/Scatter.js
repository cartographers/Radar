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
    const graphData = savedQuery.map((row, index) => {
      return {x: row[x], y: row[y]}
    })

    return (
      <div>

        <div>
          <h4>Scatter Plot</h4>
        </div>

        <div className="center">
          <ScatterChart
            width={width}
            height={height}
            margin={{top: 20, right: 20, bottom: 10, left: 10}}>

            <XAxis dataKey="x" name={x.toString()} />
            <YAxis dataKey="y" name={y} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip cursor={{strokeDasharray: '3 3'}} />
            <Legend />
            <Scatter name={title} data={graphData} fill="#8884d8" />
          </ScatterChart>
        </div>
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
    queriedTable: state.queriedTable,
    savedQuery: ownProps.savedQuery
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

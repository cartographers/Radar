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
      orderedBy: this.props.orderBy
    }
    //this.props.fetchQueriedData(queryInfo)
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

    const graphData = queriedTable.map((row, index) => {
      return {x: row[x].slice(0, 4), y: row[y]}
    })

    return (
      <div>

        <div>
          <h4>Bar Graph</h4>
        </div>

        <div className="center">
          <BarChart width={width} height={height} data={graphData}>
            <XAxis dataKey="x" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="y" fill="#82ca9d" />
          </BarChart>
        </div>

      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return ({
    title: ownProps.Title || 'Name vs age ',
    width: ownProps.width || 900,
    height: ownProps.height || 500,
    x: ownProps.xAxis || 'name',
    y: ownProps.yAxis || 'age',
    orderBy: ownProps.orderedBy,
    whereThese: ownProps.whereThese,
    table: ownProps.currentTable,
    queriedTable: state.queriedTable,
    database: ownProps.currentDatabase
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


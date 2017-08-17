import React, {Component} from 'react'
import {fetchQueryTable, fetchUsers} from '../store'
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
  
  componentDidMount() {
    const queryInfo = {
      database: this.props.database || 'capstone1706',
      selectThese: this.props.selectThese || ['name', 'age'],
      whereThese: this.props.whereThese || ['greater than'],
      orderBy: this.props.orderBy || ['Ascending'],
      table: this.props.table || 'users'
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

    const graphData = queriedTable.map((row, index) => {
      return {
        x: row[x].slice(0, 4), 
        y: row[y]
      }
    })

    return (
      <AreaChart 
        width={width} 
        height={height} 
        data={graphData}
        margin={{top: 10, right: 30, left: 0, bottom: 0}}>

          <XAxis dataKey="x"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>

          <Area type='monotone' dataKey='y' stroke='#8884d8' fill='#8884d8' />

      </AreaChart>
    )
  }
}

const mapState = (state, ownProps) => {
  return ({
    title: ownProps.Title || 'Name vs age ',
    width: ownProps.width || 900,
    height: ownProps.height || 500,
    x: ownProps.xAxis|| 'name',
    y: ownProps.yAxis || 'age', 
    orderBy: ownProps.orderedBy, 
    whereThese: ownProps.whereThese, 
    table: ownProps.table,
    database: ownProps.database,
    queriedTable: state.queriedTable
  })
}

const mapDispatch = (dispatch) => {
  return({
    fetchQueriedData(queryInfo) {
      dispatch(fetchQueryTable(queryInfo))
    }
  })
}

export default connect(mapState, mapDispatch)(AreaGraph)

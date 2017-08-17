import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import {fetchQueryTable} from '../store'

class AreaGraph extends Component {

  componentDidMount() {
    const queryInfo = {
      database: this.props.database || 'capstone1706',
      selectThese: this.props.selectThese || ['name', 'age'],
      whereThese: this.props.whereThese || [],
      table: this.props.table || 'users'
    }
    this.props.fetchQueriedData(queryInfo)
  }

  render() {
  const {
    queriedTable,
    title,
    x,
    y,
    orderBy,
    whereThese,
    width, 
    height, 
    lineType, 
    dataKey, 
    stroke,  
    xdataKey, 
    ydataKey, 
    fill
  } = this.props

  const graphData = queriedTable.map((row, index) => {
    return {x: row[x].slice(0,4), y: row[y]}
  })

  return (
    <div className="container">

      <div><h4>Area Chart</h4></div>

      <AreaChart width={600} height={400} data={graphData}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
      </AreaChart>

    </div>
  )
  }
}

const mapState = (state, ownProps) => {
  return ({
      title: ownProps.Title || "Dummy Title",
      width: ownProps.width || 900,
      height: ownProps.height || 300,
      x: ownProps.xAxis || 'name',
      y: ownProps.yAxis || 'age',
      orderBy: ownProps.orderBy,
      whereThese: ownProps.whereThese,
      table: ownProps.table,
      database: ownProps.database,
      queriedTable: state.queriedTable,
      stroke: '#ffc658',
      fill: '#ffc658',
      lineType: 'monotone',
      dataKey: 'age',
      xdataKey: 'id',
      ydataKey: 'age',
    })
}

const mapDispatch = dispatch => {
  return {
    fetchQueriedData(queryInfo) {
      dispatch(fetchQueryTable(queryInfo))
    }
  }
}

export default connect(mapState, mapDispatch)(AreaGraph)

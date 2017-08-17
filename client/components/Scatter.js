import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchQueryTable} from '../store'

class ScatterGraph extends Component {

  componentDidMount () {
    const queryInfo = {
      database: this.props.database || 'capstone1706', 
      selectThese: this.props.selectThese || ['name', 'age'], 
      whereThese: this.props.whereThese || [], 
      table: this.props.table || 'users' 
    }
    this.props.fetchQueriedData(queryInfo)
  }

  render() {

    const {queriedTable, width, height, title, x, y, orderBy, whereThese} = this.props
    const graphData = queriedTable.map((row, index) => {
      return {x: row[x].slice(0, 4), y: row[y]}
    })
    console.log("GRAPH DATA: ", graphData)

    return (
      <div>

        <div>
          <h4>Scatter Plot</h4>
        </div>

        <div className='center'>
          <ScatterChart
            width={width}
            height={height}
            margin={{top: 20, right: 20, bottom: 10, left: 10}}>

            <XAxis dataKey="x" name={x.toString()}/>
            <YAxis dataKey="y" name={y}/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
            <Legend/>
            <Scatter name={title} data={graphData} fill="#8884d8"/>
          </ScatterChart>
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
    x: ownProps.xAxis|| 'name',
    y: ownProps.yAxis || 'age', 
    orderBy: ownProps.orderedBy, 
    selectThese: ownProps.selectThese,
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

export default connect(mapState, mapDispatch)(ScatterGraph)
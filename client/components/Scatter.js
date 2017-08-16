import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchQueryTable} from '../store'

class ScatterGraph extends Component {

  componentDidMount () {
    const queryInfo = {
      database: this.props.database, 
      selectThese: this.props.selectThese, 
      whereThese: this.props.whereThese, 
      table: this.props.table
    }
    this.props.fetchQueriedData(queryInfo)
  }

  render() {

    const {queriedTable, width, height, title, xAxis, yAxis, x, y, orderBy, whereThese} = this.props
    console.log(queriedTable)
    // const graphData = queriedTable.map((table, index) => {
    //   return {x: {table.xAxis}, y: /* ****** */}
    // })

    return (
      <div>

        <div>
          <h4>Scatter Plot</h4>
        </div>

        {/*<div className='center'>
        //   <ScatterChart
        //     width={width}
        //     height={height}
        //     margin={{top: 20, right: 20, bottom: 10, left: 10}}>

        //     <XAxis dataKey="x" name={x.toString()}/>
        //     <YAxis dataKey="y" name={y.toString()}/>
        //     <CartesianGrid strokeDasharray="3 3"/>
        //     <Tooltip cursor={{strokeDasharray: '3 3'}}/>
        //     <Legend/>
        //     <Scatter name={title} data={graphData} fill="#8884d8"/>
        //   </ScatterChart>
        // </div>
        */}

      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return ({
    title: ownProps.Title || 'Add Title Here',
    width: ownProps.width || 730,
    height: ownProps.height || 400,
    x: ownProps.xAxis || 'Axis X',
    y: ownProps.yAxis || 'Axis Y', 
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

export default connect(mapState, mapDispatch)(ScatterGraph)
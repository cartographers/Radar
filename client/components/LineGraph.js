import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchQueryTable} from '../store'

class LineGraph extends Component {
  componentDidMount () {
    const queryInfo = {
      currentDatabase: this.props.database,
      selectThese: this.props.selectThese,
      whereThese: this.props.whereThese,
      currentTable: this.props.table,
      orderBy: this.props.orderBy,
      fields: this.props.fields
    }
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
      <div className="col-md-6">
        <LineChart 
          width={width} 
          height={height} 
          data={graphData}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>

           <XAxis dataKey="name" />
           <YAxis />
           <CartesianGrid strokeDasharray="3 3" />
           <Tooltip />
           <Legend />
           <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{r: 8}} label />

        </LineChart>
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

export default connect(mapState, mapDispatch)(LineGraph)

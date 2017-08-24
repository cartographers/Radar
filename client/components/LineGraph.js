import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchQueryTable} from '../store'

class LineGraph extends Component {
  componentDidMount() {
    const queryInfo = {
      currentDatabase: this.props.database,
      selectThese: this.props.selectThese,
      whereThese: this.props.whereThese,
      currentTable: this.props.table,
      orderBy: this.props.orderBy,
      fields: this.props.fields
    }
  }
  
  render() {
    const {
      width,
      height,
      title,
      x,
      y,
      strokeGrid,
      savedQuery,
      stroke,
      fill
    } = this.props
    
    const graphData = savedQuery.map((row) => {
      return {x: row[x], y: row[y]}
    })
    
    return (
      <div className="col-md-6">
        <LineChart
          width={width}
          height={height}
          data={graphData}>
          
          <XAxis dataKey='x' />
          <YAxis dataKey='y' />
          <Tooltip/>
          <Legend/>
          <Line type="monotone" dataKey="y" stroke={stroke} fill={fill} activeDot={{r: 5}} name={title}/>
        
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
    savedQuery: ownProps.savedQuery,
    stroke: ownProps.stroke,
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

export default connect(mapState, mapDispatch)(LineGraph)

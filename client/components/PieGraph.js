import {PieChart, Pie, Legend} from 'recharts'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchQueryTable} from '../store'

class PieGraph extends Component {

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
      return {name: row[x].slice(0, 4), value: row[y]}
    })

    return (
      <div>
        <div>
          <h4>Pie Graph</h4>
        </div>

        <div>
          <PieChart
            width={800}
            height={400}>

            <Pie data={graphData} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label/>
          </PieChart>
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

export default connect(mapState, mapDispatch)(PieGraph)
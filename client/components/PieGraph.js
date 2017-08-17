import {PieChart, Pie, Legend} from 'recharts'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchQueryTable} from '../store'

class PieGraph extends Component {

  componentDidMount () {
    const queryInfo = {
      currentDatabase: this.props.database,
      selectThese: this.props.selectThese,
      whereThese: this.props.whereThese,
      currentTable: this.props.table,
      orderedBy: this.props.orderBy,
      fields: this.props.fields
    }
    // this.props.fetchQueriedData(queryInfo)
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

            <Pie data={graphData} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
          </PieChart>
        </div>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return ({
    title: ownProps.Title,
    width: ownProps.width,
    height: ownProps.height,
    x: ownProps.xAxis,
    y: ownProps.yAxis,
    orderBy: ownProps.orderedBy,
    whereThese: ownProps.whereThese,
    table: ownProps.currentTable,
    database: ownProps.currentDatabase,
    queriedTable: state.queriedTable,
    fields: state.fields
  })
}

const mapDispatch = (dispatch) => {
  return ({
    fetchQueriedData(queryInfo) {
      dispatch(fetchQueryTable(queryInfo))
    }
  })
}

export default connect(mapState, mapDispatch)(PieGraph)

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
      orderBy: this.props.orderBy,
      fields: this.props.fields,
      pieKey: this.props.pieKey
    }
    this.props.fetchQueriedData(queryInfo)
  }

  render() {

    const {
      queriedTable,
      width,
      height,
      title,
      orderBy,
      whereThese,
      savedQuery,
      fields,
      pieKey
    } = this.props

    const graphData = savedQuery.map(row => {
      return row  // Tom, look at this thing! - by NG
    })

    return (
      <div className="col-md-6">
            <PieChart
              width={800}
              height={400}>

              <Pie dataKey={pieKey} data={graphData} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
            </PieChart>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return ({
    title: ownProps.title,
    width: ownProps.width,
    height: ownProps.height,
    orderBy: ownProps.orderedBy,
    whereThese: ownProps.whereThese,
    table: ownProps.table,
    database: ownProps.database,
    fields: state.fields,
    queriedTable: state.queriedTable,
    savedQuery: ownProps.savedQuery,
    pieKey: ownProps.pieKey
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

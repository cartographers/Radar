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
      fields,
      pieKey
    } = this.props

    console.log('PIE KEY (PIEGRAPH.JS)', pieKey)

    const graphData = queriedTable.map((row, index) => {
      console.log('ROW:', row)
      return row
    })


    const data02 = [{name: 'A1', value: 100},
                    {name: 'A2', value: 300},
                   {name: 'B1', value: 100},
                   {name: 'B2', value: 80},
                   {name: 'B3', value: 40},
                   {name: 'B4', value: 30},
                   {name: 'B5', value: 50},
                  {name: 'C1', value: 100},
                  {name: 'C2', value: 200},
                   {name: 'D1', value: 150},
                   {name: 'D2', value: 50}]


    return (
      <div>
        <div>
          <h4>Pie Graph</h4>
        </div>

        <div>
          <PieChart
            width={800}
            height={400}>

            <Pie dataKey={pieKey} data={graphData} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
          </PieChart>
        </div>
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
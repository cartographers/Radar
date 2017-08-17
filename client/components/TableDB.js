import React, {Component} from 'react'
import {Table, thead, tr, th, tbody, td} from 'react-bootstrap'
import {connect} from 'react-redux'
import {fetchQueryTable} from '../store'

class TableDB extends Component {

  componentDidMount () {
    const queryInfo = {
      currentDatabase: this.props.database,
      selectThese: this.props.selectThese,
      whereThese: this.props.whereThese,
      orderedBy: this.props.orderBy,
      currentTable: this.props.table,
      fields: this.props.fields
    }
    this.props.fetchQueriedData(queryInfo)
  }

  render() {

    const {
      queriedTable,
      title,
      orderBy,
      whereThese,
      fields
    } = this.props

    const graphData = queriedTable.map((row, index) => {
      return row
    })

    return (
      <div>
        <div>
          <h4>Table</h4>
        </div>

        <div>
          <Table>
            <thead>
            <tr>
              {
                fields.map((field, index) => {
                  return (
                    <th key={index}>
                      {field}
                    </th>
                  )
                })
            }
            </tr>
            </thead>
            <tbody>
              {
                graphData.map((row, index) => {
                  const values = Object.values(row)
                  return (
                    <tr key={index}>
                      <td>
                        {
                          values[0]
                        }
                      </td>
                      <td>
                        {
                          values[1]
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  console.log(state)
  return ({
    title: ownProps.Title || 'Name vs age ',
    orderBy: ownProps.orderedBy,
    whereThese: ownProps.whereThese,
    table: ownProps.currentTable,
    selectThese: ownProps.selectThese,
    queriedTable: state.queriedTable,
    fields: state.fields,
    database: ownProps.currentDatabase
  })
}

const mapDispatch = (dispatch) => {
  return ({
    fetchQueriedData(queryInfo) {
      dispatch(fetchQueryTable(queryInfo))
    }
  })
}

export default connect(mapState, mapDispatch)(TableDB)

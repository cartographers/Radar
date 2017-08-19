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
      currentTable: this.props.table,
      orderBy: this.props.orderBy,
      fields: this.props.fields
    }
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
      fields
    } = this.props

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
                      {field.name}
                    </th>
                  )
                })
            }
            </tr>
            </thead>
            <tbody>
              {
                savedQuery.map((row, index) => {
                  const values = Object.values(row)
                  return (
                    <tr key={index}>
                        { values.map( (val, index) => <td key={index}>{val}</td>)}
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

export default connect(mapState, mapDispatch)(TableDB)

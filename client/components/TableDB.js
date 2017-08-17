import React, {Component} from 'react'
import {Table, thead, tr, th, tbody, td} from 'react-bootstrap'
import {connect} from 'react-redux'
import {fetchQueryTable} from '../store'

class TableDB extends Component {

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
      title, 
      orderBy, 
      whereThese,
      fields
    } = this.props

    const graphData = queriedTable.map((row, index) => {
      return row
    })
    console.log(fields)

    return (
      <div>
        <div>
          <h4>Table</h4>
        </div>

        <div>
          <Table>
            <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            </tbody>
          </Table>
        </div>

      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return ({
    title: ownProps.Title || 'Name vs age ',
    orderBy: ownProps.orderedBy, 
    whereThese: ownProps.whereThese, 
    table: ownProps.table,
    selectThese: ownProps.selectThese,
    database: ownProps.database,
    queriedTable: state.queriedTable,
  })
}

const mapDispatch = (dispatch) => {
  return({
    fetchQueriedData(queryInfo) {
      dispatch(fetchQueryTable(queryInfo))
    }
  })
}

export default connect(mapState, mapDispatch) (TableDB)
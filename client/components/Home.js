import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Accordion, Panel} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { fetchDatabase, searchDatabase, fetchFields, fetchDatabases } from '../store'

class Home extends Component {

  componentDidMount() {
    this.props.loadDatabases()
  }

  render() {

    const {data, fields, databases} = this.props

    return (
      <div>
        <div>
          <h4>Welcome!</h4>
        </div>

        <div>
          <h5>Your databases:::</h5>
        </div>

        <div>
          <Accordion>
            {
              databases && databases.map((database, index) => {
                return (
                  <Link to={`/form/${database.datname}`}>
                    <div>{ database.datname }</div>
                  </Link>
                )
              })
            }
          </Accordion>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    data: state.database,
    databases: state.databases,
    fields: state.fields
  }
}

const mapDispatch = dispatch => {
  return {
    onSubmit(event) {
      event.preventDefault()
      const settings = {
        user: event.target.user.value,
        host: event.target.host.value,
        port: event.target.port.value,
        password: event.target.password.value,
        database: event.target.database.value,
        table: event.target.table.value,
        selectThese: [],
        whereThese: [],
        conditionals: [],
        orderedBy: ''

      }
      dispatch(searchDatabase(settings))
      dispatch(fetchFields(settings))
    },
    loadDatabases() {
      dispatch(fetchDatabases())
    }
  }
}
export default connect(mapState, mapDispatch)(Home)


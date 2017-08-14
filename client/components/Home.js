import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Accordion, Panel} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { fetchDatabase, searchDatabase } from '../store'

class Home extends Component {
  render() {

    const tables = ['table1', 'table2', 'table3', 'table4', 'table5']
    const databases = ['Database 1', 'Database 2', 'Database 3', 'Database 4', 'Database 5']

    return (
      <div>
        <div>
          <h4>Welcome!</h4>
        </div>

        <div>
          <h5>Your databases:::</h5>
        </div>
        <div>
          <form className="dbForm" onSubmit={this.props.onSubmit}>
            User:
            <input
              name="user"
              type="text"
              placeholder="Enter User"
            />
            Host:
            <input
              name="host"
              defaultValue="localhost"
              type="text"
              placeholder="Enter Host"
            />
            Port:
            <input
              name="port"
              defaultValue="5432"
              type="integer"
              placeholder="Enter Port"
            />
            Password:
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
            />
            Database:
            <input
              name="database"
              type="text"
              placeholder="Enter Database"
            />
            Table:
            <input
              name="table"
              type="text"
              placeholder="Enter Table"
            />
            <button id="connectButton">Connect Database</button>
          </form>
        </div>
        <div>
          <ul>
          {this.props.data && this.props.data.map(dataItem => {
            return (
                <li key={dataItem.id}>{ dataItem.name }</li>
              )
          })}
          </ul>
        </div>

        <div>
          <Accordion>
            {
              databases.map((database, index) => {
                return (
                  <Panel header={database} eventKey={index}>
                    {
                      tables.map((table, index) => {
                        return (
                          <div key={index}>
                            <Link to="/table1"> {table} </Link>
                          </div>
                        )
                      })
                    }
                  </Panel>
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
    data: state.database
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
        table: event.target.table.value
      }
      dispatch(searchDatabase(settings))
    }
  }
}
export default connect(mapState, mapDispatch)(Home)


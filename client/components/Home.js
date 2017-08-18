import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchDatabases } from '../store'
import {Badge} from 'react-bootstrap'


class Home extends Component {

  componentDidMount() {
    this.props.loadDatabases()
  }

  render() {

    const {databases} = this.props

    return (
      <div className="container">
        <div className="row">
          <div className="row">
            <div className="row">
              <div className="col-lg-12">
                <h4>
                  Postgres Databases
                  <Badge> {databases.length} </Badge>
                </h4>
              </div>
              <div className="col-lg-12">
                  {
                    databases && databases.map((database, index) => {
                      return (
                        <div className="dbList" key={index}>
                          <Link key={database.datname} to={`/form/${database.datname}`}>
                            <div className="col-md-4" style={{textAlign: 'left'}}>
                              { database.datname }
                            </div>
                          </Link>
                        </div>
                      )
                    })
                  }
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  console.log(state)
  return {
    databases: state.databases,
  }
}

const mapDispatch = dispatch => {
  return {
    loadDatabases() {
      dispatch(fetchDatabases())
    }
  }
}
export default connect(mapState, mapDispatch)(Home)


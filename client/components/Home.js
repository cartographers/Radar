import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchDatabases } from '../store'


class Home extends Component {

  componentDidMount() {
    this.props.loadDatabases()
  }

  render() {

    const {databases} = this.props

    return (
      <div>
        <div>
          <h4>Welcome!</h4>
        </div>
        <div>
          <h5>Your databases:::</h5>
        </div>
        <div>
            {
              databases && databases.map((database) => {
                return (
                  <Link key={database.datname} to={`/form/${database.datname}`}>
                    <div>{ database.datname }</div>
                  </Link>
                )
              })
            }
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    databases: state.databases
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


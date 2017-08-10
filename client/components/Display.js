import React from 'react'
import {connect} from 'react-redux'
import { fetchUsers } from '../store'

class Display extends React.Component {

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render () {

    const users = this.props.users

    return (
      <div className="container">
        <div>
          {users && users.map(user => {
            return (
                <h4 key={ user.id }>{ user.name }</h4>
              )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return ({
    users: state.users
  })
}

const mapDispatch = dispatch => {
  return ({
    fetchAllUsers () {
      dispatch(fetchUsers())
    }
  })
}

export default connect(mapState, mapDispatch)(Display)

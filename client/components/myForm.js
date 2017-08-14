import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../store'

//this form is assuming that the table we're currently rendering is the Users table

class myForm extends React.Component {

  constructor() {
    super()
    this.state = {
      selectThese: [],
      whereThese: [],
      orderedBy: 'None'
    }
    addSelect : () => ({
      this.setState()
    })
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }


  render () {
    const { table, columns } = this.props;
    return (
      <div></div>
    )
  }
}

const mapState = state => {
  return ({
    table: state.users,
    columns: (state.users ? Object.keys(state.users[0]) : undefinded)
  })
}

const mapDispatch = dispatch => {
  return ({
    fetchAllUsers () {
      dispatch(fetchUsers())
    }
  })
}

export default connect(mapState, mapDispatch)(myForm)

import React from 'react'
import {connect} from 'react-redux'
import { PieChart } from 'react-d3-basic'
import { fetchUsers } from '../store'

class PieGraph extends React.Component {

	constructor() {
		super()
		this.state = {
			width: 700,
			height: 400
		}
	}

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render () {

    const {data} = this.props
    const usersGender = (user) => user.usersGender

    return (
      <div className="container">
        <div className="chart">Chart of Data Table</div>
        <div>The Width:  {this.width}</div>
        <PieChart
	        data= {usersGender}
		      width= {this.state.width}
		      height= {this.state.height}
		      chartSeries= {data}
		      value = {usersGender}
	      />
      </div>
    )
  }
}

const mapState = state => {
  return ({
    data: state.users
  })
}

const mapDispatch = dispatch => {
  return ({
    fetchAllUsers () {
      dispatch(fetchUsers())
    }
  })
}

export default connect(mapState, mapDispatch)(PieGraph)

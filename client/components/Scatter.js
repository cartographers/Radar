import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store'

class ScatterGraph extends Component {

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {

    const {width, height, users} = this.props
    const graphData = users.map((user, index) => {
      return {x: index + 1, y: user.age}
    })

    const data = [{x: 100, y: 200}, {x: 120, y: 100},
      {x: 170, y: 300}, {x: 140, y: 250},
      {x: 150, y: 400}, {x: 110, y: 280}]

    return (
      <div>

        <div>
          <h4>Scatter Plot</h4>
        </div>

        <div className='center'>
          <ScatterChart
            width={width}
            height={height}
            margin={{top: 20, right: 20, bottom: 10, left: 10}}>

            <XAxis dataKey="x" name="user"/>
            <YAxis dataKey="y" name="age" unit=" years"/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
            <Legend/>
            <Scatter name="users vs age" data={data} fill="#8884d8"/>
          </ScatterChart>
        </div>

      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return ({
    width: ownProps.width || 730,
    height: ownProps.height || 400,
    users: ownProps.data || state.users
  })
}

const mapDispatch = dispatch => {
  return ({
    fetchAllUsers() {
      dispatch(fetchUsers())
    }
  })
}

export default connect(mapState, mapDispatch)(ScatterGraph)
import React from 'react'
import {connect} from 'react-redux'
import { fetchUsers } from '../store'
import ReactDOM from 'react-dom'
import { BarChart } from 'react-d3-basic'

 let  generalChartData = require('dsv?delimiter=\t!../data/letter.tsv')


class barChart extends React.Component {

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render () {

    const {data} = this.props
    const usersAge = data.map(user => user.age)
    barGraph(usersAge)

    return (
    <LineChart
      width= {600}
      height= {300}
      data= {data}
      chartSeries= {chartSeries}
      x= {x}
    />
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

export default connect(mapState, mapDispatch)(Display)

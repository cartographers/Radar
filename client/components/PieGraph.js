import React from 'react'
import {connect} from 'react-redux'
import { PieChart } from 'react-d3-basic'
import { fetchUsers } from '../store'

class PieGraph extends React.Component {

  constructor() {
    super()
    this.state = {
      width: 700,
      height: 400,
      value: (d) => +d.age,
      name: (d) => d.age
    }
    this.returnName = this.returnName.bind(this)
    this.returnValue = this.returnValue.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  returnValue(d) {
    console.log('Value....', d)
    return +d.age
  }

  returnName(d) {
    console.log('Name....', d)
    return d.age
  }

  render () {

    const {data} = this.props
    const chartSeries = [
      {'field': '<26',
       'name': '<26'
      },
      {
        'field': '>26',
        'name': '>26'
      }]

    return (
      <div className="container">
        <div className="chart">Chart of Data Table</div>
        <div>The Data:  </div>
        <PieChart
          data= {data}
          width= {this.state.width}
          height= {this.state.height}
          radius= {200}
          chartSeries= {chartSeries}
          value= {this.state.value}
          name= {this.state.name}
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

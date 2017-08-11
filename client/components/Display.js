import React from 'react'
import {connect} from 'react-redux'
import { fetchUsers } from '../store'
import {barGraph} from '../D3'

var testData = [30, 86, 168, 281, 303, 365]

class Display extends React.Component {

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render () {

    const {data} = this.props
    const usersAge = data.map(user => user.age)
    barGraph(usersAge)

    return (
      <div className="container">
        <div className="chart">Chart of Data Table</div>
        <div>
          {data && data.map(dataItem => {
            return (
                <h4 key={ dataItem.id }>{ dataItem.name }</h4>
              )
          })}
        </div>
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

export default connect(mapState, mapDispatch)(Display)

//<select>{chartType}</select>

// {chartType === {chartType} ?
//   <BarGraph /> :
//   <PieGraph />
// }






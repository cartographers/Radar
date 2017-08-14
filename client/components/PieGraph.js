import React from 'react'
import {connect} from 'react-redux'
import { PieTooltip } from 'react-d3-tooltip'
import { fetchUsers } from '../store'
import { makePie } from '../D3'

class PieGraph extends React.Component {

  componentDidMount() {
    this.props.fetchAllUsers()

  }

  render () {

    const { data, width, height, value, title, label} = this.props
    const settings = {width, height, value, title, label}

    makePie(data, settings)

    return (
      <div className="container">
        <h3>{ title }</h3>
        <svg className="pieChart container" />
        <svg className="paths" />
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return ({
    data: ownProps.data || state.users,  // state.users just for testing
    width: ownProps.width || 500,
    height: ownProps.height || 220,
    value: ownProps.value || 'sales',
    title: ownProps.title || 'Pie Chart',
    label: ownProps.label || 'name'
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


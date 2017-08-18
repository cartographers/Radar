import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Navbar extends React.Component {

  render() {

    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-left">
            <Link to="/home"><h4>ReGres/Radar</h4></Link>
          </div>
        </div>
      </nav>
    )
  }
}

const mapState = (state) => {
  return {
    currentDatabase: state.currentDatabase
  }
}

const mapDispatch = dispatch => {
  return {
  }
}

export default connect(mapState, mapDispatch)(Navbar)

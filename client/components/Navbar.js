import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import history from '../history'
import {logout} from '../store'

class Navbar extends React.Component {

  render() {

    const {handleClick, isLoggedIn} = this.props

    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-left">
            <Link to="/home"><h4>HOME</h4></Link>
            <Link to="/form"><h4>form sample</h4></Link>
            <Link to="/scatter"><h4>scatter</h4></Link>
            <Link to="/bar"><h4>bar</h4></Link>
            <Link to="/table"><h4>table</h4></Link>
            <Link to="/pie"><h4>pie</h4></Link>
            <Link to="/line"><h4>line</h4></Link>
            <Link to="/area"><h4>area</h4></Link>
          </div>
        </div>
      </nav>
    )
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      history.push('/')
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

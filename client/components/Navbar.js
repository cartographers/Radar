import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Image} from 'react-bootstrap'
import logo from '../../public/70685-radar-chart.png'

class Navbar extends React.Component {

  render() {

    return (
      <nav className="navbar navbar-default logo">
        <div className="navbar-brand">
          <Image src={logo} circle style={{float: 'left', marginRight: '0.5' + 'em', height: 2 + 'em', width: 2 + 'em'}}/>
          <Link to="/home" className="links">Radar</Link>
        </div>
        <div className="navbar-brand navbar navbar-right">
          <Link to="/settings">Settings</Link>
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

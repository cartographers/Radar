import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Image} from 'react-bootstrap'

class Navbar extends React.Component {

  render() {

    return (
      <nav className="navbar navbar-default logo">
        <div className="navbar-brand">
          <Image src="http://via.placeholder.com/20x20" circle style={{float: 'left', marginRight: '0.5' + 'em'}}/>
          <Link to="/home" className="links">Radar</Link>
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

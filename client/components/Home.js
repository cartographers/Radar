import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchDatabases, fetchGraphs} from '../store'
import {Jumbotron, Button, Image, Collapse, Well} from 'react-bootstrap'
import logo from '../../public/70685-radar-chart.png'


class Home extends Component {
  
  constructor() {
    super()
    this.state = {}
  }
  
  componentDidMount() {
    this.props.loadDatabases()
    this.props.loadGraphs()
  }
  
  render() {
    
    const {databases} = this.props
    const wellStyles = {maxWidth: 400, margin: '0 auto 10px', backgroundColor: '#36454f'}
    const listDatabases = () => {
      return databases && databases.map(database => {
        return (
          <div className="dbList" key={database.datname}>
            <Link to={`/form/${database.datname}`} className="links">
              <div className="col-md-4 glyphicon glyphicon-flash"
                   style={{textAlign: 'left', paddingBottom: '0.5' + 'em'}}>
                {database.datname}
              </div>
            </Link>
          </div>
        )
      })
    }
    
    return (
      <div className="container">
        <div className="row">
          <div className="row">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="statcard p-3">
                    <h3 className="statcard-number">{this.props.databases.length}</h3>
                    <span className="statcard-desc">total databases</span>
                  </div>
                  <div className="statcard p-3 text-xs-center">
                    <h3 className="statcard-number">{this.props.graphs.length}</h3>
                    <span className="statcard-desc">total graphs created</span>
                  </div>
                </div>
                <div className="col-md-12">
                  {listDatabases()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    databases: state.databases,
    graphs: state.createdGraphs
  }
}

const mapDispatch = dispatch => {
  return {
    loadDatabases() {
      dispatch(fetchDatabases())
    },
    loadGraphs() {
      dispatch(fetchGraphs())
    }
  }
}
export default connect(mapState, mapDispatch)(Home)


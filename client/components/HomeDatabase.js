import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchDatabases, fetchGraphs} from '../store'
import {Modal,Button} from 'react-bootstrap'

class HomeDatabase extends Component {

  constructor() {
    super()
    this.state = {
      renderDatabase: false
    }
    this.showDatabase = this.showDatabase.bind(this)
  }

  componentDidMount() {
    this.props.loadDatabases()
    this.props.loadGraphs()
  }

  showDatabase () {
    this.setState({
      renderDatabase: !this.state.renderDatabase
    })
  }

  render() {

    const {databases} = this.props
    const listDatabases = () => {
      return (
        <Modal.Dialog>
        <Modal.Body>
          {databases && databases.map(database => {
            return (
              <Link to={`/form/${database.datname}`} className="links">{database.datname}</Link>
            )
          })}
        </Modal.Body>
      </Modal.Dialog>
      )
    }

    return (
        <div className="cover-container">

          <div className="inner cover">
            <h1 className="cover-heading">Radar</h1>
            <p className="lead">Postgres thangs and chicken wangs</p>
            <div className="lead">
              <div onClick={this.showDatabase} className="btn btn-lg btn-default">Get Started</div>
              <Modal.Dialog bsSize="large" className="modal-database">
              <Modal.Header>
                <Modal.Title>Pick a Database</Modal.Title>
              </Modal.Header>

              {this.state.renderDatabase ? listDatabases() : null}

              <Modal.Footer>
                <Button>Close</Button>
                <Button bsStyle="primary">Save changes</Button>
              </Modal.Footer>
            </Modal.Dialog>
              
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
export default connect(mapState, mapDispatch)(HomeDatabase)

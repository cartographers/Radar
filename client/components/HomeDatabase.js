import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchDatabases, fetchGraphs} from '../store'
import {Modal, Button} from 'react-bootstrap'

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

    showDatabase() {
        this.setState({
            renderDatabase: !this.state.renderDatabase
        })
    }

    render() {

        const {databases} = this.props
        const listDatabases = () => {
            return (
                <Modal bsSize="large" show={this.state.renderDatabase}>
                    <Modal.Header>
                        <Modal.Title>
                            <div style={{float: 'left', color: 'white'}}>
                                Pick a Database
                            </div>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{height: 35*(Math.floor(databases.length / 3) + 1) + 'px'}} >
                        {databases.map((database) => {
                            return (
                                <Link to={`/form/${database.datname}`}
                                      className="links col-md-4" style={{padding: 0, margin: 0}}>{database.datname}</Link>
                            )
                        })}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsSize="small" onClick={this.showDatabase}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )
        }

        return (
            <div className="cover-container">

                <div className="inner cover home">
                    <h1 className="cover-heading">Radar</h1>
                    <p className="lead">Postgres thangs and chicken wangs</p>
                    <div className="lead">
                        <div onClick={this.showDatabase} className="btn btn-lg btn-default">Get Started</div>

                        {this.state.renderDatabase ? listDatabases() : null}

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

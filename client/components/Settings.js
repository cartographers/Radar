import React from 'react'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import { editPort, fetchPort } from '../store'

class Settings extends React.Component {

  componentDidMount(){
    this.props.grabPort(this.props.port)
  }

  render (){
    const port = this.props.port

    return (
        <div className="container">
          <form onSubmit={this.props.changePort}>
            <div className="row">
              <h4>Port Number: </h4>
              <input
                type="text"
                placeholder="Postgres Port #"
                defaultValue={port}
                name="port"
              />
            </div>
            <div className="row">
              <Button
                style={{display: 'block'}}
                type="submit"
                className="btn btn-success" >
                Change Port
              </Button>
            </div>
          </form>
        </div>
    )
  }
}

const mapState = (state) => {
  return {
    port: state.portSetting
  }
}

const mapDispatch = dispatch => {
  return {
    grabPort(){
      dispatch(fetchPort())
    },
    changePort (event) {
      event.preventDefault()
      dispatch(editPort(event.target.port.value))
    }
  }
}

export default connect(mapState, mapDispatch)(Settings)

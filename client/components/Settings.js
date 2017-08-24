import React from 'react'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import { updatePort, setPort } from '../store'

class Settings extends React.Component {

  render (){
    return (
        <div className="container">
          <form onSubmit={(event) => this.props.changePort(this.props.currentDatabase, event)}>
            <div className="row">
              <h4>Port Number: </h4>
              <input
                type="text"
                placeholder="Enter SQL query"
                devaultValue="5432"
                name="customQuery"
              />
            </div>
            <div className="row">
              <Button
                style={{display: 'block'}}
                type="submit"
                className="btn btn-success" >
                Query Database
              </Button>
            </div>
          </form>
        </div>
    )
  }
}

const mapState = (state) => {
  return {
  }
}

const mapDispatch = dispatch => {
  return {
    changePort (currentDatabase, event) {
      event.preventDefault()
      const SQLquery = event.target.customQuery.value
      let newSettings = {
        currentDatabase: currentDatabase,
        SQLquery: SQLquery,
        settings: {}
      }
      dispatch(fetchQueryTableCustom(newSettings))
    }
  }
}

export default connect(mapState, mapDispatch)(Settings)

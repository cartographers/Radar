import React from 'react'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import { currentDatabase, fetchQueryTableCustom } from '../store'

class CustomQuery extends React.Component {

  render (){
    return (
        <div className="container">
          <form onSubmit={(event) => this.props.querySQLform(this.props.currentDatabase, event)}>
            <div className="row">
              <h4>Custom Query: </h4>
              <textarea
                type="text"
                rows="3" cols="60"
                placeholder="Enter SQL query"
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
    currentDatabase: state.currentDatabase
  }
}

const mapDispatch = dispatch => {
  return {
    setCurrentDatabase (database) {
      dispatch(currentDatabase(database))
    },
    querySQLform (currentDatabase, event) {
      event.preventDefault()
      const SQLquery = event.target.customQuery.value
      let newSettings = {
        currentDatabase: currentDatabase,
        SQLquery: SQLquery,
        settings: {}
      }
      console.log('Settings....', newSettings)
      dispatch(fetchQueryTableCustom(newSettings))
    }
  }
}

export default connect(mapState, mapDispatch)(CustomQuery)

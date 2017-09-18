import React from 'react'
import { connect } from 'react-redux'
import { currentDatabase, fetchQueryTableCustom } from '../store'

class CustomQuery extends React.Component {

  render (){
    return (
        <div>
          <form onSubmit={(event) => this.props.querySQLform(this.props.currentDatabase, event)}>
            <div>
              <textarea
                type="text"
                rows="3" cols="60"
                placeholder="Enter SQL query"
                name="customQuery"
              />
            </div>
            <div className="col-md-12" style={{marginTop: 1 + 'em'}}>
              <button
                style={{display: 'block', float: 'right', marginTop: 1 + 'em'}}
                type="submit"
                className="btn btn-primary btn-xs" >
                Query Database
              </button>
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

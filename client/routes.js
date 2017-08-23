import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import history from './history'
import {Main, Login, Signup, UserHome, Display, PieGraph, myForm, Scatter, Home, LineGraph, BarGraph, TableDB, AreaGraph, CustomQuery} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
  }

  render () {

    return (
      <Router history={history}>
        <Main>
          <div className="container">
            <Switch>
              {/* Routes placed here are available to all visitors */}
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/display" component={Display} />
              <Route exact path="/pie" component={PieGraph} />
              <Route path="/form/:dbName" component={myForm} />
              <Route exact path="/scatter" component={Scatter} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/bar" component={BarGraph} />
              <Route exact path="/table" component={TableDB} />
              <Route exact path="/line" component={LineGraph} />
              <Route exact path="/area" component={AreaGraph} />
              <Route path="/customquery/:dbName" component={CustomQuery} />
              <Route component={Home} />
            </Switch>
          </div>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default connect(mapState, mapDispatch)(Routes)

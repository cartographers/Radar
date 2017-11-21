import React from 'react'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import history from './history'
import {myForm, CustomQuery, HomeDatabase, Settings} from './components'

/**
 * COMPONENT
 */
var Routes = () => {
    return (
      <Router history={history}>
          <div className="site-wrapper-inner">
            <Switch>
              <Route path="/form/:dbName" component={myForm} />
              <Route path="/customquery/:dbName" component={CustomQuery} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/home" component={HomeDatabase} />
              <Route component={HomeDatabase} />
            </Switch>
          </div>
      </Router>
    )
}

export default Routes

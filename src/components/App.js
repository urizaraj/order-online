import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { userCheckToken } from '../actions/userActions'

import NavBar from './NavBar'
import MenusPage from './MenusPage';
import LocationsPage from './LocationsPage'
import SignInPage from './SignInPage'

class App extends Component {
  constructor(props) {
    super(props)

    props.userCheckToken()
  }

  render() {
    return (
      <Router>
        <div className="App container h-100">
          <NavBar />
          <Switch>
            <Route path='/users/sign_in' component={SignInPage} />
            <Route path='/menus' component={MenusPage} />
            <Route path='/locations' component={LocationsPage} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapDispatch = dispatch => {
  const actions = { userCheckToken }
  return bindActionCreators(actions, dispatch)
}

export default connect(null, mapDispatch)(App)
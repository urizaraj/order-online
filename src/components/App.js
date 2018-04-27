import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { userCheckToken } from '../actions/userActions'

import NavBar from './NavBar'
import LocationsPage from './locations/LocationsPage'
import SignInPage from './SignInPage'
import AdminPage from './AdminPage'
import SavedOrdersPage from './orders/SavedOrdersPage';

class App extends Component {
  constructor(props) {
    super(props)

    props.userCheckToken()
  }

  render() {
    return (
      <Router>
        <div className="App container">
          <NavBar />
          <Switch>
            <Route path='/locations' component={LocationsPage} />
            <Route path='/admin' component={AdminPage} />

            <Route path='/user/sign_in' component={SignInPage} />
            <Route path='/user/saved_orders' component={SavedOrdersPage} />
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

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(App)
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { userCheckToken } from '../actions/userActions'

import NavBar from './NavBar'
import LocationsPage from './locations/LocationsPage'
import AdminPage from './AdminPage'
import { UserPage } from './users';

class App extends Component {
  constructor(props) {
    super(props)

    props.userCheckToken()
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />

          <div className="App container">
            <Switch>
              <Route path='/locations' component={LocationsPage} />
              <Route path='/admin' component={AdminPage} />
              <Route path='/user' component={UserPage} />
              <Route path='/' render={this.home} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }

  home = () => <div>Welcome!</div>
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
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NavBar from './NavBar'
import MenusPage from './MenusPage';
import LocationsPage from './LocationsPage'
import SignInPage from './SignInPage'

class App extends Component {
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

export default App;

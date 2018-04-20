import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import MenusPage from './MenusPage';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Router>
          <Switch>
            <Route path={'/menus'} component={MenusPage} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;

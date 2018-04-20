import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import MenusPage from './MenusPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
          <Switch>
            <Route path={'/menus'} component={MenusPage} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

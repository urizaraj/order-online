import React, { Component } from 'react'
import { UserShow, SignInPage, SignUpPage } from '.';
import { Route, Switch } from 'react-router-dom'

class UserPage extends Component {
  render() {
    return (
      <Switch>
        <Route path='/user/sign_in' component={SignInPage} />
        <Route path='/user/sign_up' component={SignUpPage} />
        <Route path='/user' component={UserShow} />
      </Switch>
    )
  }
}

export default UserPage
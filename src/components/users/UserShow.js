import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link, NavLink } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import SavedOrdersPage from '../orders/SavedOrdersPage'
import { Nav } from '../elements';

class UserShow extends Component {
  render() {
    if (!this.props.signedIn) return <Redirect to='/' />
    return (
      <div>
        <h1 className='display-3' >
          {this.props.name}
        </h1>

        <div className='mb-3' >
          <Nav>
            <NavLink exact to='/user'>
              Account
            </NavLink>
            <NavLink to='/user/saved_orders'>
              Saved Orders
            </NavLink>

          </Nav>
        </div>

        <Switch>
          <Route path='/user/saved_orders/page/:page' component={SavedOrdersPage} />
          <Route path='/user/saved_orders' component={SavedOrdersPage} />
        </Switch>
      </div>
    )
  }
}

const mapState = state => ({
  name: state.user.name,
  signedIn: state.user.signedIn
})

export default connect(mapState)(UserShow)
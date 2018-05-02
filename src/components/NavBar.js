import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

import { userSignOut } from '../actions/userActions'
import { Row, BCol } from './elements'

const NavBar = props => {
  return (
    <Row opt='p-3 align-items-center' >
      <BCol size='auto' >
        <NavLink to="/" >Home</NavLink>
      </BCol>

      <BCol size='auto' >
        <NavLink to="/locations">Locations</NavLink>
      </BCol>

      {props.user.signedIn ? <SignedInLinks userSignOut={props.userSignOut} user={props.user} /> : <SignedOutLinks />}

    </Row>
  )
}

const SignedInLinks = props => {
  return (
    <React.Fragment>
      <BCol size='auto' key='username' >
        <strong className='text-primary' >
          {props.user.name}
        </strong>
      </BCol>

      <BCol size='auto' key='signOut' >
        <button className='btn btn-primary' onClick={() => props.userSignOut()} >Sign Out</button>
      </BCol>

      <BCol size='auto' key='savedOrders' >
        <NavLink to='/user/saved_orders'>Saved Orders</NavLink>
      </BCol>
    </React.Fragment>
  )
}

const SignedOutLinks = props => {
  return [
    <BCol size='auto' >
      <NavLink to="/user/sign_in">Sign In</NavLink>
    </BCol>,
    <BCol size='auto' >
      <NavLink to="/user/sign_up">Sign Up</NavLink>
    </BCol>
  ]
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  const actions = { userSignOut }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(NavBar)
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

import { userSignOut } from '../actions/userActions'
import { Row, BCol } from './elements'

const NavBar = props => {
  return (
    <Row opt='p-3' >
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
  const username = (
    <BCol size='auto' key='username' >
      {props.user.name}
    </BCol>
  )

  const signOut = (
    <BCol size='auto' key='signOut' >
      <button className='btn btn-primary btn-sm' onClick={() => props.userSignOut()} >Sign Out</button>
    </BCol>
  )

  const savedOrders = (
    <BCol size='auto' key='savedOrders' >
      <NavLink to='/user/saved_orders'>Saved Orders</NavLink>
    </BCol>
  )

  return [username, signOut, savedOrders]
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
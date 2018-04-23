import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

import { userSignOut } from '../actions/userActions'

const NavBar = props => {
  let final

  if (props.user.signedIn) {
    final = props.user.name
  } else {
    final = <NavLink to="/users/sign_in">Sign In</NavLink>
  }

  return (
    <div>
      <NavLink to="/" >Home</NavLink>
      {' '}
      <NavLink to="/locations">Locations</NavLink>
      {' '}
      {final}
      {' '}
      {props.user.signedIn && <button className='btn btn-primary btn-sm' onClick={() => props.userSignOut()} >Sign Out</button>}

    </div>
  )
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
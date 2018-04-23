import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

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
      
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(NavBar)
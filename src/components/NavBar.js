import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

import { userSignOut } from '../actions/userActions'
import { Row, Col as BCol } from './elements'

const NavBar = props => {
  let final

  if (props.user.signedIn) {
    final = props.user.name
  } else {
    final = <NavLink to="/users/sign_in">Sign In</NavLink>
  }

  return (
    <Row>
      <BCol size='auto' >
        <NavLink to="/" >Home</NavLink>
      </BCol>

      <BCol size='auto' >
        <NavLink to="/locations">Locations</NavLink>
      </BCol>

      <BCol size='auto' >
        {final}
      </BCol>

      <BCol size='auto' >
        {props.user.signedIn && <button className='btn btn-primary btn-sm' onClick={() => props.userSignOut()} >Sign Out</button>}
      </BCol>

      <BCol size='auto' >
        <NavLink to='/user/saved_orders'>Saved Orders</NavLink>
      </BCol>
    </Row>
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
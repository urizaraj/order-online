import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { userSignOut } from '../actions/userActions'
import { Row, BCol } from './elements'

const NavBar = props => {
  return (
    <Row opt='p-3 align-items-center' >
      <BCol size='auto' >
        <Link to="/" >Home</Link>
      </BCol>

      <BCol size='auto' >
        <Link to="/locations">Locations</Link>
      </BCol>

      {props.user.signedIn ? <SignedInLinks userSignOut={props.userSignOut} user={props.user} /> : <SignedOutLinks />}

    </Row>
  )
}

const SignedInLinks = props => {
  return (
    <React.Fragment>
      <BCol size='auto' >
        <Link to='/user'>
          <strong>
            {props.user.name}
          </strong>
        </Link>
      </BCol>

      <BCol size='auto' >
        <button className='btn btn-primary text-light' onClick={() => props.userSignOut()} >Sign Out</button>
      </BCol>

      <BCol size='auto' >
        <Link to='/user/saved_orders'>Saved Orders</Link>
      </BCol>
    </React.Fragment>
  )
}

const SignedOutLinks = props => {
  return (
    <React.Fragment>
      <BCol size='auto' >
        <Link to="/user/sign_in">Sign In</Link>
      </BCol>
      <BCol size='auto' >
        <Link to="/user/sign_up">Sign Up</Link>
      </BCol>
    </React.Fragment>
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
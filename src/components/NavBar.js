import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { userSignOut } from '../actions/userActions'
import { DFlex } from './elements'

export const NavBar = props => {
  return (
    <div className='container-fluid bg-secondary' >
      <DFlex opt='align-items-stretch flex-wrap' >
        <Link to="/" >
          <div className='cnav' >
            Home
          </div>
        </Link>

        <Link to="/locations">
          <div className='cnav' >
            Locations
          </div>
        </Link>

        {props.user.signedIn ? <SignedInLinks userSignOut={props.userSignOut} user={props.user} /> : <SignedOutLinks />}
      </DFlex>
    </div>
  )
}

const SignedInLinks = props => {
  const signOut = () => props.userSignOut()
  return (
    <Fragment>
      <Link to='/user' className='ml-auto'  >
        <div className='cnav user' >
          {props.user.name}
        </div>
      </Link>

      <Link to='/' onClick={signOut}>
        <div className='cnav' >
          Sign Out
      </div>
      </Link>
    </Fragment>
  )
}

const SignedOutLinks = props => {
  return (
    <Fragment>
      <Link to="/user/sign_in">
        <div className='cnav' >
          Sign In
        </div>
      </Link>
      <Link to="/user/sign_up">
        <div className='cnav' >
          Sign Up
        </div>
      </Link>
    </Fragment>
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
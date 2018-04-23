import React from 'react'

import { NavLink } from 'react-router-dom'

const NavBar = props => {
  return (
    <div>
      <NavLink to="/" >Home</NavLink>
      {' '}
      <NavLink to="/locations">Locations</NavLink>
      {' '}
      <NavLink to="/users/sign_in">Sign In</NavLink>
      
    </div>
  )
}

export default NavBar
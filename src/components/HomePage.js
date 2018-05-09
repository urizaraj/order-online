import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = props => {
  return (
    <div>
      <h1>Order Online</h1>
      <p className='home'>
        Browse our <Link to='/locations'>locations</Link> to get started.
      </p>
    </div>
  )
}

export default HomePage 
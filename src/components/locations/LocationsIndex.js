import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { fetchLocations } from '../../actions/locationActions'

import Icon from '@fortawesome/react-fontawesome'

class LocationsIndex extends Component {
  render() {

    if (this.props.loading) return <div className='text-center' ><Icon icon="spinner" spin size='2x' /></div>

    return (
      <div>
        <div className='mb-3' >
          <NavLink to='/locations/new'>New Location</NavLink>
        </div>

        {this.props.locations.map(location => <Location {...location} key={location.id} />)}
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchLocations()
  }
}

const Location = props => {
  const { name, description, id } = props
  return (
    <div className='mb-3' >
      {name}
      <br />
      <small>{description}</small>
      <br />
      <NavLink to={`/locations/${id}`} >Link</NavLink>
    </div>
  )
}

// connect to store

const mapState = state => {
  return {
    locations: state.locations.locations,
    loading: state.locations.loading
  }
}

const mapDispatch = dispatch => {
  const actions = { fetchLocations }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(LocationsIndex)
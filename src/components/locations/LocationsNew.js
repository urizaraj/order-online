import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { resetLocation, saveLocation } from '../../actions/newLocationActions'

import Location from './formComponents/Location'

class LocationNew extends Component {
  render() {
    if (this.props.saved) return <Redirect to='/locations' />

    return (
      <div>
        <h1>New Location</h1>
        <Location />

        <button
          onClick={this.saveLocation}
          className='btn btn-primary' >
          Save Location
        </button>

      </div>
    )
  }

  saveLocation = event => {
    this.props.saveLocation()
  }

  componentWillUnmount() {
    this.props.resetLocation()
  }
}

const mapState = state => {
  return {
    saved: state.newLocation.saved
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({ saveLocation, resetLocation }, dispatch)
}

export default connect(mapState, mapDispatch)(LocationNew)
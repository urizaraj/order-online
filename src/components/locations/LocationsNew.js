import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { resetLocation, saveLocation } from '../../actions/newLocationActions'

import Location from './formComponents/Location'

class LocationNew extends Component {
  render() {
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

const mapDispatch = dispatch => {
  return bindActionCreators({ saveLocation, resetLocation }, dispatch)
}

export default connect(null, mapDispatch)(LocationNew)
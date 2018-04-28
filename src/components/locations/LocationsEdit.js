import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchLocation, updateLocation } from '../../actions/editLocationActions'

import Location from './formComponents/Location'

class LocationEdit extends Component {
  render() {
    return (
      <div>
        <h1>Edit Location</h1>
        <Location />

        <button
          onClick={this.updateLocation}
          className='btn btn-primary' >
          Update Location
        </button>

      </div>
    )
  }

  componentDidMount() {
    this.props.fetchLocation(this.props.match.params.locationId)
  }

  updateLocation = event => {
    this.props.updateLocation()
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({ fetchLocation, updateLocation }, dispatch)
}

export default connect(null, mapDispatch)(LocationEdit)
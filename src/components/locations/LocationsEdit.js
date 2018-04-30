import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchLocation, patchLocation } from '../../actions/editLocationActions'
import { resetLocation } from '../../actions/newLocationActions'

import Location from './formComponents/Location'
import Icon from '@fortawesome/react-fontawesome'

class LocationEdit extends Component {
  render() {
    if (this.props.loading) return <div className='text-center' ><Icon icon="spinner" spin size='2x' /></div>
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
    this.props.fetchLocation(this.props.id)
  }

  updateLocation = event => {
    this.props.updateLocation()
  }

  componentWillUnmount() {
    this.props.resetLocation()
  }
}

const mapState = state => {
  return {
    loading: state.newLocation.loading
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({ fetchLocation, patchLocation, resetLocation }, dispatch)
}

export default connect(mapState, mapDispatch)(LocationEdit)
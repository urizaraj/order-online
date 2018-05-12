import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { resetLocation, saveLocation } from '../../actions/newLocationActions'
import { Btn } from '../elements'
import Location from './formComponents/Location'

class LocationNew extends Component {
  render() {
    if (!this.props.signedIn) return <Redirect to='/locations' />
    if (this.props.saved) return <Redirect to='/locations' />

    return (
      <div>
        <h1>New Location</h1>
        <Location />

        <Btn primary onClick={this.saveLocation}>
          Save Location
        </Btn>
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
    signedIn: state.user.signedIn,
    saved: state.locationNew.saved
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({ saveLocation, resetLocation }, dispatch)
}

export default connect(mapState, mapDispatch)(LocationNew)
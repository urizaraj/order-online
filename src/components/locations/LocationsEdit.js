import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { fetchLocation, patchLocation } from '../../actions/editLocationActions'
import { resetLocation } from '../../actions/newLocationActions'

import Location from './formComponents/Location'
import Icon from '@fortawesome/react-fontawesome'
import { Btn } from '../elements'

const loading = (
  <div className="text-center">
    <Icon icon="spinner" spin size="2x" />
  </div>
)

class LocationEdit extends Component {
  render() {
    if (this.props.loading) return loading
    if (!this.props.signedIn) return <Redirect to="/locations" />
    return (
      <div>
        <h1>Edit Location</h1>
        <Location />

        <Btn primary onClick={this.patchLocation}>
          Update Location
        </Btn>
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchLocation(this.props.id)
  }

  patchLocation = event => {
    this.props.patchLocation()
  }

  componentWillUnmount() {
    this.props.resetLocation()
  }
}

const mapState = state => {
  return {
    loading: state.locationNew.loading,
    signedIn: state.user.signedIn
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators(
    { fetchLocation, patchLocation, resetLocation },
    dispatch
  )
}

export default connect(mapState, mapDispatch)(LocationEdit)

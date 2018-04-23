import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchLocation } from '../actions/locationActions'

class LocationsShow extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchLocation(this.props.match.params.locationId)
  }
}

const mapState = state => {
  return { ...state.locations.location }
}

const mapDispatch = dispatch => {
  const actions = { fetchLocation }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(LocationsShow)
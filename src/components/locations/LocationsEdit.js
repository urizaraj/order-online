import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchLocation } from '../../actions/editLocationActions'

import Location from './formComponents/Location'


class LocationEdit extends Component {
  render() {
    return (
      <div>
        <h1>Edit Location</h1>
        <Location/>
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchLocation(1)
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({ fetchLocation }, dispatch)
}


export default connect(null, mapDispatch)(LocationEdit)
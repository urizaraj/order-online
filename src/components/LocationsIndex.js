import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchLocations } from '../actions/locationActions'

class LocationsIndex extends Component {
  render() {
    return (
      <div>
        {this.props.locations.map(location => <Location {...location} key={location.id} />)}
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchLocations()
  }
}

const Location = props => {
  const { name, description } = props
  return (
    <div className='mb-3' >
      {name}
      <br/>
      <small>{description}</small>
    </div>
  )
}

const mapState = state => {
  return {
    locations: state.locations.locations
  }
}

const mapDispatch = dispatch => {
  const actions = { fetchLocations }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(LocationsIndex)
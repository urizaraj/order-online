import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchLocations } from '../../actions/locationActions'

import Icon from '@fortawesome/react-fontawesome'

import { DFlex, Row, BCol, Pagination } from '../elements'

class LocationsIndex extends Component {
  constructor() {
    super()
    this.state = {
      page: 1
    }
  }

  render() {

    if (this.props.loading) return <div className='text-center' ><Icon icon="spinner" spin size='2x' /></div>

    return (
      <div>
        {this.props.signedIn && (
          <div className='mb-3' >
            <Link to='/locations/new'>New Location</Link>
          </div>
        )}

        <Row>
          {this.props.locations.map(location => <Location {...location} key={location.id} />)}
        </Row>

        <Pagination
          page={this.state.page}
          prevPage={this.prevPage}
          nextPage={this.nextPage} />
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchLocations()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.props.fetchLocations(this.state.page)
    }
  }

  nextPage = () => this.setState(({ page }) => ({ page: page + 1 }))

  prevPage = () => this.setState(({ page }) => ({ page: page - 1 }))
}

const Location = props => {
  const { name, description, id } = props
  return (
    <BCol size='md-6 mb-3' >
      <h1 className='display-4 mb-1' >{name}</h1>
      <DFlex>
        {description}
        <div className='ml-3' >
          <LocationLink id={id} />
        </div>
      </DFlex>
    </BCol>
  )
}

const LocationLink = ({ id }) => <Link to={`/locations/${id}`} >Link <Icon icon='arrow-right' /> </Link>

// connect to store

const mapState = state => {
  return {
    locations: state.locations.locations,
    loading: state.locations.loading,
    signedIn: state.user.signedIn
  }
}

const mapDispatch = dispatch => {
  const actions = { fetchLocations }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(LocationsIndex)
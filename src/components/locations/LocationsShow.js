import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import { Row, BCol } from '../elements'

import { fetchLocation } from '../../actions/locationActions'

import Icon from '@fortawesome/react-fontawesome'

import Menu from '../menus/MenusShow'
import LocationsEdit from './LocationsEdit';
import OrderNew from '../orders/OrderNew';

class LocationsShow extends Component {
  constructor(props) {
    super(props)
    this.url = props.match.url
    this.id = props.match.params.locationId

    this.state = {
      loading: true
    }
  }

  render() {
    if (this.state.loading) return <div className='text-center' ><Icon icon="spinner" spin size='2x' /></div>

    return (
      <div>
        <h1 className='mb-0' >{this.props.name}</h1>
        <div className='mb-3' >
          {this.props.description}
        </div>

        <LocationActions url={this.url} />

        <Switch>
          <Route path={`${this.url}/edit`} render={this.locationEdit} />
          <Route path={`${this.url}/menu`} component={Menu} />
          <Route path={`${this.url}/new_order`} render={this.newOrder} />
        </Switch>
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchLocation(this.id)
      .then(() => this.setState({ loading: false }))
  }

  locationEdit = () => <LocationsEdit id={this.id} />

  newOrder = () => <OrderNew categories={this.props.menu.categories} />
}

const LocationActions = props => {
  const { url } = props
  return (
    <Row opt='mb-3' >
      <BCol size='auto' >
        <NavLink to={`${url}/menu`} >
          Menu
        </NavLink>
      </BCol>

      <BCol size='auto' >
        <NavLink to={`${url}/edit`} >
          Edit
        </NavLink>
      </BCol>

      <BCol>
        <NavLink to={`${url}/new_order`} >
          New Order
        </NavLink>
      </BCol>
    </Row>
  )
}

const mapState = state => {
  return {
    ...state.locations.location,
    loading: state.locations.loading
  }
}

const mapDispatch = dispatch => {
  const actions = { fetchLocation }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(LocationsShow)
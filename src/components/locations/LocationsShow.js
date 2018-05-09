import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import { Nav } from '../elements'

import { fetchLocation } from '../../actions/locationActions'
import { fetchMenu } from '../../actions/menuActions'

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
        <h1 className='mb-2 display-4' >{this.props.name}</h1>
        <div className='description' >
          {this.props.description}
        </div>

        <LocationActions url={this.url} signedIn={this.props.signedIn} />

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
      .then(() => this.props.fetchMenu(this.props.menu.id))
      .then(() => this.setState({ loading: false }))
  }

  locationEdit = () => <LocationsEdit id={this.id} />

  newOrder = () => <OrderNew categories={this.props.menu.categories} />
}

const LocationActions = props => {
  const { url } = props
  return (
    <div className='mb-3' >
      <Nav>
        <NavLink to={`${url}/menu`} >
          Menu
          </NavLink>
        <NavLink to={`${url}/new_order`} >
          New Order
          </NavLink>
        {props.signedIn && (
          <NavLink to={`${url}/edit`} >
            Edit
          </NavLink>
        )}
      </Nav>
    </div>
  )
}

const mapState = state => {
  return {
    ...state.locations.location,
    signedIn: state.user.signedIn,
    loading: state.locations.loading
  }
}

const mapDispatch = dispatch => {
  const actions = { fetchLocation, fetchMenu }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(LocationsShow)
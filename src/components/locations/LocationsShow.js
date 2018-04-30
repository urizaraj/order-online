import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import { fetchLocation } from '../../actions/locationActions'

import Icon from '@fortawesome/react-fontawesome'

import Menu from '../menus/MenusShow'

class LocationsShow extends Component {
  render() {
    if (this.props.loading) return <div className='text-center' ><Icon icon="spinner" spin size='2x' /></div>

    return (
      <div>
        <h1>{this.props.name}</h1>
        <div>
          {this.props.description}
        </div>

        <MenuList menus={this.props.menus} url={this.props.match.url} />
        <NavLink to={`${this.props.match.url}/edit`} >
          Edit
        </NavLink>

        <Switch>
          <Route path={`${this.props.match.url}/menus/:menuId`} component={Menu} />
        </Switch>
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchLocation(this.props.match.params.locationId)
  }
}

const MenuList = props => {
  const menus = props.menus || []
  return menus.map(menu => (
    <div key={menu.id} >
      <NavLink to={`${props.url}/menus/${menu.id}`} >{menu.name}</NavLink>
    </div>
  ))
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
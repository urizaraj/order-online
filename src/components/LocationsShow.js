import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchLocation } from '../actions/locationActions'
import { NavLink } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import Menu from './Menu'

class LocationsShow extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <div>
          {this.props.description}
        </div>

        <MenuList menus={this.props.menus} url={this.props.match.url} />
        
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
  return { ...state.locations.location }
}

const mapDispatch = dispatch => {
  const actions = { fetchLocation }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(LocationsShow)
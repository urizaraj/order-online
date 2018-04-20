import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from './Menu';

const MenusPage = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/:menuId`} component={Menu} />
  </Switch>
)

export default MenusPage
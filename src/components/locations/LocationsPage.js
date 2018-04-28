import React from 'react'
import { Route, Switch } from 'react-router-dom'

import LocationsIndex from './LocationsIndex'
import LocationsShow from './LocationsShow'
import LocationsNew from './LocationsNew'
import LocationsEdit from './LocationsEdit'

const LocationsPage = props => {
  return (
    <div>
      <Switch>
        <Route path={`${props.match.url}/new`} component={LocationsNew} />
        <Route path={`${props.match.url}/:locationId/edit`} component={LocationsEdit} />
        <Route path={`${props.match.url}/:locationId`} component={LocationsShow} />
        <Route path={`${props.match.url}`} component={LocationsIndex} />
      </Switch>
    </div>
  )
}

export default LocationsPage
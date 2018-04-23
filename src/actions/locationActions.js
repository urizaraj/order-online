export function fetchLocations() {
  return dispatch => {
    dispatch({ type: 'LOADING_LOCATIONS' })

    return fetch('/locations')
      .then(resp => resp.json())
      .then(resp => {
        dispatch({ type: 'FETCH_LOCATIONS', locations: resp })
      })
  }
}

export function fetchLocation(locationId) {
  return dispatch => {
    dispatch({ type: 'LOADING_LOCATION' })

    return fetch(`/locations/${locationId}`)
      .then(resp => resp.json())
      .then(resp => {
        dispatch({type: 'FETCH_LOCATION', location: resp})
      })
  }
}
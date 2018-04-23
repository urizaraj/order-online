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
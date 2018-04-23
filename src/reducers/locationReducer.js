const locationReducer = (state = { locations: [], loading: false, location: null }, action) => {
  switch (action.type) {
    case 'FETCH_LOCATIONS':
      return { loading: false, locations: action.locations }

    case 'FETCH_LOCATION':
      return { loading: false, locations: [], location: action.location }

    default:
      return state
  }
}

export default locationReducer
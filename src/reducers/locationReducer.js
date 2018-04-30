const locationReducer = (state = { locations: [], loading: false, location: null }, action) => {
  switch (action.type) {
    case 'FETCH_LOCATIONS':
      return { ...state, loading: false, locations: action.locations }

    case 'FETCH_LOCATION':
      return { ...state, loading: false, location: action.location }

    case 'LOADING_LOCATIONS':
      return { ...state, loading: true, locations: [] }

    case 'LOADING_LOCATION':
      return { ...state, loading: true, location: null }

    default:
      return state
  }
}

export default locationReducer
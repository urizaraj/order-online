const locationReducer = (state = { locations: [], loading: false }, action) => {
  switch (action.type) {
    case 'FETCH_LOCATIONS':
      return { loading: false, locations: action.locations }

    default:
      return state
  }
}

export default locationReducer
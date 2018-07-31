const initialState = {
  categories: [],
  items: [],
  options: [],
  name: '',
  description: '',
  loading: false,
  saved: false,
  id: null
}

const locationNewReducer = (state = { ...initialState }, action) => {
  const { resource } = action
  let cuid

  switch (action.type) {
    case 'ADD_RESOURCE':
      return { ...state, [resource]: [...state[resource], action.value] }

    case 'UPDATE_RESOURCE':
      const sameCuid = cuidCheckFunction(action)
      return { ...state, [resource]: state[resource].map(sameCuid) }

    case 'REMOVE_RESOURCE':
      cuid = action.cuid
      let filtered = state[resource].filter(r => r.cuid !== cuid)
      return { ...state, [resource]: filtered }

    case 'UPDATE_LOCATION':
      return { ...state, ...action.value }

    case 'RESET_LOCATION':
      return { ...initialState }

    case 'LOADING_EDIT_LOCATION':
      return { ...state, loading: true }

    case 'LOADED_EDIT_LOCATION':
      return { ...state, loading: false }

    case 'LOCATION_SAVED':
      return { ...state, saved: true, id: action.id }

    default:
      return state
  }
}

function cuidCheckFunction(action) {
  const { cuid, value } = action
  return function(resource) {
    return resource.cuid === cuid ? { ...resource, ...value } : resource
  }
}

export default locationNewReducer

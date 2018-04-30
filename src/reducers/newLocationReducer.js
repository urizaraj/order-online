const newLocationReducer = (state = { categories: [], items: [], options: [], name: '', description: '', loading: false }, action) => {
  const { resource } = action
  let cuid

  switch (action.type) {
    case 'ADD_RESOURCE':
      return { ...state, [resource]: [...state[resource], action.value] }

    case 'UPDATE_RESOURCE':
      cuid = action.cuid
      return {
        ...state, [resource]: state[resource].map(r => {
          return (r.cuid === cuid ? { ...r, ...action.value } : r)
        })
      }

    case 'REMOVE_RESOURCE':
      cuid = action.cuid
      let filtered = state[resource].filter(r => r.cuid !== cuid)
      return { ...state, [resource]: filtered }

    case 'UPDATE_LOCATION':
      return { ...state, ...action.value }

    case 'RESET_LOCATION':
      return { categories: [], items: [], options: [], name: '', description: '', loading: false }

    case 'LOADING_EDIT_LOCATION':
      return { ...state, loading: true }

    case 'LOADED_EDIT_LOCATION':
      return {...state, loading: false}

    default:
      return state
  }
}

export default newLocationReducer
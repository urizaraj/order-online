const newLocationReducer = (state = { categories: [], items: [], options: [] }, action) => {
  const { resource } = action
  let cuid

  switch (action.type) {
    case 'ADD_RESOURCE':
      return {...state, [resource]: [...state[resource], action.value]}

    case 'UPDATE_RESOURCE':
      cuid = action.cuid
      return {...state, [resource]: state[resource].map(r => {
        return (r.cuid === cuid ? {...r, ...action.value} : r)
      })}

    case 'REMOVE_RESOURCE':
      cuid = action.cuid
      let filtered = state[resource].filter(r => r.cuid !== cuid)
      return {...state, [resource]: filtered}

    default:
      return state
  }
}

export default newLocationReducer
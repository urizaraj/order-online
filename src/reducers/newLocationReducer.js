const newLocationReducer = (state = { categories: {}, items: {}, options: {} }, action) => {
  const { resource, cuid } = action

  switch (action.type) {
    case 'ADD_RESOURCE':
      return { ...state, [resource]: { ...state[resource], [cuid]: action.value } }

    case 'UPDATE_RESOURCE':
      return { ...state, [resource]: { ...state[resource], [cuid]: action.value } }

    case 'REMOVE_RESOURCE':
      const { [cuid]: a, ...rest } = state[resource]
      return {...state, [resource]: rest}

    default:
      return state
  }
}

export default newLocationReducer
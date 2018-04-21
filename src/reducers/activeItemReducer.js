const activeItemReducer = (state = {item: null, options: []}, action) => {
  switch(action.type) {
    case 'ADD_ACTIVE_ITEM':
      return {item: action.payload, options: []}

    case 'REMOVE_ACTIVE_ITEM':
      return {item: null, options: []}

    default:
      return state
  }
}

export default activeItemReducer
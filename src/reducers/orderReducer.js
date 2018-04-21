const orderReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case 'ADD_ORDER_ITEM':
      return { items: [...state.items, action.item]}

    default:
      return state
  }
}

export default orderReducer
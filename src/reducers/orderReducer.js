const orderReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case 'ADD_ORDER_ITEM':
      return { items: [...state.items, action.item]}

    case 'REMOVE_ORDER_ITEM':
      return { items: state.items.filter(item => item.cuid !== action.cuid)}

    default:
      return state
  }
}

export default orderReducer
const orderReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case 'ADD_ORDER_ITEM':
      return { items: [...state.items, action.item]}

    case 'REMOVE_ORDER_ITEM':
      return { items: state.items.filter(item => item.cuid !== action.cuid)}

    case 'RESET_ORDER':
      return {items: []}

    default:
      return state
  }
}

export default orderReducer
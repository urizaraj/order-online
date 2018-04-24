const orderReducer = (state = { items: [], id: null }, action) => {
  switch (action.type) {
    case 'ADD_ORDER_ITEM':
      return { items: [...state.items, action.item] }

    case 'REMOVE_ORDER_ITEM':
      return { items: state.items.filter(item => item.cuid !== action.cuid) }

    case 'RESET_ORDER':
      return { items: [] }

    case 'FETCH_ORDER':
      return { items: action.items, id: action.id }

    default:
      return state
  }
}

export default orderReducer
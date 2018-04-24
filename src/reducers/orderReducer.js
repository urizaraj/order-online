const orderReducer = (state = { items: [], id: null, index: [], loading: false }, action) => {
  switch (action.type) {
    case 'ADD_ORDER_ITEM':
      return { items: [...state.items, action.item] }

    case 'REMOVE_ORDER_ITEM':
      return { items: state.items.filter(item => item.cuid !== action.cuid) }

    case 'RESET_ORDER':
      return { ...state, items: [], id: null }

    case 'FETCH_ORDER':
      return { ...state, items: action.items, id: action.id, loading: false }

    case 'FETCH_ORDER_INDEX':
      return {...state, index: action.index, loading: false}

    case 'LOADING_ORDER':
      return {...state, loading: true}

    default:
      return state
  }
}

export default orderReducer
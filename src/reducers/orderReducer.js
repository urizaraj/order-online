const orderReducer = (state = { index: [], loading: false, saved: false, checkOut: false }, action) => {
  switch (action.type) {
    case 'FETCH_ORDER_INDEX':
      return { ...state, index: action.index, loading: false }

    case 'LOADING_ORDER':
      return { ...state, loading: true }

    case 'ORDER_SAVED':
      return { ...state, saved: true }

    case 'CHECK_OUT':
      return { ...state, checkOut: !state.checkOut }

    default:
      return state
  }
}

export default orderReducer
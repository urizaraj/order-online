const orderReducer = (state = {
  index: [],
  id: null,
  items: [],
  loading: false,
  saved: false,
  checkOut: false,
  order: {
    paymentType: '',
    cardNumber: '',
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    deliveryType: '',
    tip: ''
  }
}, action) => {
  switch (action.type) {
    case 'ADD_ORDER_ITEM':
      return { ...state, items: [...state.items, action.item] }

    case 'REMOVE_ORDER_ITEM':
      return { ...state, items: state.items.filter(item => item.cuid !== action.cuid) }

    case 'RESET_ORDER':
      return { ...state, items: [], id: null, saved: false, checkOut: false }

    case 'FETCH_ORDER':
      return { ...state, items: action.items, id: action.id, loading: false }

    case 'FETCH_ORDER_INDEX':
      return { ...state, index: action.index, loading: false }

    case 'LOADING_ORDER':
      return { ...state, loading: true }

    case 'ORDER_SAVED':
      return { ...state, saved: true }

    case 'CHECK_OUT':
      return { ...state, checkOut: !state.checkOut }

    case 'UPDATE_ORDER':
      return { ...state, order: {...state.order, ...action.value}}

    default:
      return state
  }
}

export default orderReducer
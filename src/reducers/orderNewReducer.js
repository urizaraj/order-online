const initial = {
  paymentType: '',
  cardNumber: '',
  fullName: '',
  address: '',
  city: '',
  state: '',
  zipcode: '',
  deliveryType: '',
  tip: '',
  orderItems: []
}

const orderNewReducer = (state = { ...initial }, action) => {
  switch (action.type) {
    case 'ADD_ORDER_ITEM':
      return {
        ...state,
        orderItems: [...state.orderItems, action.orderItem]
      }

    case 'REMOVE_ORDER_ITEM':
      return {
        ...state,
        orderItems: state.orderItems.filter(
          item => item.cuid !== action.cuid
        )
      }

    case 'UPDATE_ORDER':
      return { ...state, ...action.value }

    case 'RESET_ORDER':
      return { ...initial }

    case 'FETCH_ORDER':
      return { ...state, ...action.order }

    default:
      return state
  }
}

export default orderNewReducer
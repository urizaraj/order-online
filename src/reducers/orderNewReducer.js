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
  orderItemsAttributes: []
}

const orderNewReducer = (state = { ...initial }, action) => {
  switch (action.type) {
    case 'ADD_ORDER_ITEM':
      return {
        ...state,
        orderItemsAttributes: [...state.orderItemsAttributes, action.orderItem]
      }

    case 'REMOVE_ORDER_ITEM':
      return {
        ...state,
        orderItemsAttributes: state.orderItemsAttributes.filter(
          item => item.cuid !== action.cuid
        )
      }

    case 'UPDATE_ORDER':
      return { ...state, ...action.value }

    case 'RESET_ORDER':
      return { ...initial }

    default:
      return state
  }
}

export default orderNewReducer
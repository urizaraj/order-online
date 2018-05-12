import cuid from 'cuid'

export function addOrderItem(item, orderItem) {
  const { id, name, price, options } = item

  const { instructions, selectedOptions } = orderItem
  return {
    type: 'ADD_ORDER_ITEM',
    orderItem: {
      itemId: id,
      name,
      price,
      cuid: cuid(),
      instructions,
      selectedOptions: selectedOptions.map(so => {
        const option = options.find(({ id }) => id === so)
        return {
          optionId: option.id,
          name: option.name,
          price: option.price
        }
      })
    }
  }
}

export const removeOrderItem = cuid => ({ type: 'REMOVE_ORDER_ITEM', cuid })

export const updateOrder = value => ({ type: 'UPDATE_ORDER', value })

export const resetOrder = () => {
  return dispatch => {
    dispatch({ type: 'RESET_ORDER' })
    return dispatch({ type: 'NEW_ORDER' })
  }
}

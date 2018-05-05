import cuid from 'cuid'

export function addOrderItem(item, orderItem) {
  const { id, ...rest } = item
  return {
    type: 'ADD_ORDER_ITEM',
    orderItem: {
      itemId: id,
      ...rest,
      cuid: cuid(),
      instructions: orderItem.instructions,
      selectedOptions: orderItem.selectedOptions.map(so => ({
        optionId: so.id,
        name: so.name,
        price: so.price
      }))
    }
  }
}

export const removeOrderItem = cuid => ({ type: 'REMOVE_ORDER_ITEM', cuid })

export const updateOrder = value => ({ type: 'UPDATE_ORDER', value })

export const resetOrder = () => ({ type: 'RESET_ORDER' })
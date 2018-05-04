import cuid from 'cuid'

export function addOrderItem(item, orderItem) {
  return {
    type: 'ADD_ORDER_ITEM',
    orderItem: {
      itemId: item.id,
      cuid: cuid(),
      instructions: orderItem.instructions,
      selectedOptionsAttributes: orderItem.selectedOptions.map(so => ({
        optionId: so.id
      }))
    }
  }
}

export const removeOrderItem = cuid => ({ type: 'REMOVE_ORDER_ITEM', cuid })

export const updateOrder = value => ({ type: 'UPDATE_ORDER', value })

export const resetOrder = () => ({ type: 'RESET_ORDER' })
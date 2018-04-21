import cuid from 'cuid'

export function addOrderItem(item, selectedOptions, text) {
  return {
    type: 'ADD_ORDER_ITEM',
    item: {...item, cuid: cuid(), selectedOptions, instructions: text}
  }
}

export function removeOrderItem(cuid) {
  return {
    type: 'REMOVE_ORDER_ITEM',
    cuid
  }
}
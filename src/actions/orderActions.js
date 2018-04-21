import cuid from 'cuid'

export function addOrderItem(item, selectedOptions) {
  return {
    type: 'ADD_ORDER_ITEM',
    item: {...item, cuid: cuid(), selectedOptions}
  }
}

export function removeOrderItem(cuid) {
  return {
    type: 'REMOVE_ORDER_ITEM',
    cuid
  }
}
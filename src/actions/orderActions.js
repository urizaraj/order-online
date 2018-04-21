import cuid from 'cuid'

export function addOrderItem(item) {
  return {
    type: 'ADD_ORDER_ITEM',
    item: {...item, cuid: cuid()}
  }
}

export function removeOrderItem(cuid) {
  return {
    type: 'REMOVE_ORDER_ITEM',
    cuid
  }
}
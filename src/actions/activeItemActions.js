export function addActiveItem(item) {
  return {
    type: 'ADD_ACTIVE_ITEM',
    payload: item
  }
}

export function removeActiveItem() {
  return { type: 'REMOVE_ACTIVE_ITEM' }
}

export function toggleActiveItem(active, id) {
  return active ? removeActiveItem() : addActiveItem(id)
}
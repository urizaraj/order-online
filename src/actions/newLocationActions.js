import cuid from 'cuid'

export function addCategory() {
  return {
    type: 'ADD_RESOURCE',
    resource: 'categories',
    value: { cuid: cuid(), name: '' }
  }
}

export function updateCategory(cuid, value) {
  return {
    type: 'UPDATE_RESOURCE',
    resource: 'categories',
    cuid,
    value
  }
}

export function removeCategory(cuid) {
  return {
    type: 'REMOVE_RESOURCE',
    resource: 'categories',
    cuid
  }
}

export function addItem(categoryCuid) {
  return {
    type: 'ADD_RESOURCE',
    resource: 'items',
    value: { name: '', price: '', categoryCuid, cuid: cuid() }
  }
}

export function updateItem(cuid, value) {
  return {
    type: 'UPDATE_RESOURCE',
    resource: 'items',
    cuid,
    value
  }
}
import cuid from 'cuid'

export function addCategory() {
  return {
    type: 'ADD_RESOURCE',
    resource: 'categories',
    cuid: cuid(),
    value: { name: '' }
  }
}

export function updateCategory(cuid, value) {
  return {
    type: 'ADD_RESOURCE',
    resource: 'categories',
    cuid,
    value: { name: value }
  }
}

export function removeCategory(cuid) {
  return {
    type: 'REMOVE_RESOURCE',
    resource: 'categories',
    cuid
  }
}
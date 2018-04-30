import cuid from 'cuid'

export function addCategory(menuId = null) {
  return {
    type: 'ADD_RESOURCE',
    resource: 'categories',
    value: { cuid: cuid(), name: '', menu_id: menuId }
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

export function addItem(categoryCuid, categoryId = null) {
  return {
    type: 'ADD_RESOURCE',
    resource: 'items',
    value: { name: '', price: '', description: '', categoryCuid, cuid: cuid(), category_id: categoryId }
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

export function removeItem(cuid) {
  return {
    type: 'REMOVE_RESOURCE',
    resource: 'items',
    cuid
  }
}

export function addOption(itemCuid, itemId = null) {
  return {
    type: 'ADD_RESOURCE',
    resource: 'options',
    value: {
      name: '',
      price: '',
      description: '',
      itemCuid,
      item_id: itemId,
      cuid: cuid()
    }
  }
}

export function updateOption(cuid, value) {
  return {
    type: 'UPDATE_RESOURCE',
    resource: 'options',
    cuid,
    value
  }
}

export function removeOption(cuid) {
  return {
    type: 'REMOVE_RESOURCE',
    resource: 'options',
    cuid
  }
}

export function updateLocationName(name) {
  return {
    type: 'UPDATE_LOCATION',
    value: { name }
  }
}

export function updateLocationDescription(description) {
  return {
    type: 'UPDATE_LOCATION',
    value: { description }
  }
}

export function resetLocation() {
  return { type: 'RESET_LOCATION' }
}

export function saveLocation() {
  return (dispatch, getState) => {
    const state = getState().newLocation
    const options = {
      method: 'POST',
      body: JSON.stringify({ location: state }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${localStorage.getItem('token')}`
      }
    }

    return fetch(`/locations`, options)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        dispatch({ type: 'LOCATION_SAVED' })
      })
  }
}

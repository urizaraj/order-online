import cuid from 'cuid'

export function updateResource(resource, cuid, value) {
  return { type: 'UPDATE_RESOURCE', resource, cuid, value }
}

export function removeResource(resource, cuid) {
  return { type: 'REMOVE_RESOURCE', resource, cuid }
}

export function addCategory(menuId = null) {
  return {
    type: 'ADD_RESOURCE',
    resource: 'categories',
    value: { cuid: cuid(), name: '', menu_id: menuId }
  }
}

export function addItem(categoryCuid, categoryId = null) {
  return {
    type: 'ADD_RESOURCE',
    resource: 'items',
    value: { name: '', price: '', description: '', categoryCuid, cuid: cuid(), category_id: categoryId }
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

export function updateLocation(value) {
  return { type: 'UPDATE_LOCATION', value }
}

export function resetLocation() {
  return { type: 'RESET_LOCATION' }
}

export function saveLocation() {
  return (dispatch, getState) => {
    const state = getState().newLocation
    console.log(state)
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
        if (resp.saved) {
          dispatch({ type: 'LOCATION_SAVED' })
        }
      })
  }
}

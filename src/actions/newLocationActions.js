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
    value: { name: '', price: '', description: '', categoryCuid, cuid: cuid() }
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

export function addOption(itemCuid) {
  return {
    type: 'ADD_RESOURCE',
    resource: 'options',
    value: {
      name: '',
      price: '',
      description: '',
      itemCuid,
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

export function saveLocation() {
  return (dispatch, getState) => {
    const state = getState().newLocation

    let a = {}
    let b = {}

    for (let category of state.categories) {
      let { cuid, ...rest } = category
      a[cuid] = { ...rest, items_attributes: [] }
    }

    for (let item of state.items) {
      let { cuid, categoryCuid, ...rest } = item
      let c = b[cuid] = { ...rest, options_attributes: [] }
      if (a[categoryCuid]) a[categoryCuid].items_attributes.push(c)
    }

    for (let option of state.options) {
      let { cuid, itemCuid, ...rest } = option
      if (b[itemCuid]) b[itemCuid].options_attributes.push(rest)
    }

    const data = {
      name: state.name,
      description: state.description,
      menus_attributes: [{
        categories_attributes: Object.values(a)
      }]
    }

    const params = {
      method: 'POST',
      body: JSON.stringify({ location: data }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${localStorage.getItem('token')}`
      }
    }

    return fetch('/locations', params)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        dispatch({ type: 'LOCATION_SAVED' })
      })
  }
}
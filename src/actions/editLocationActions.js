import cuid from 'cuid'

export function fetchLocation(id) {
  return dispatch => {
    return fetch(`/locations/${id}?edit=true`)
      .then(resp => resp.json())
      .then(resp => {
        handleResp(resp, dispatch)
      })
  }
}

function handleResp(resp, dispatch) {
  for (let resource of ['categories', 'items', 'options']) {
    for (let value of resp[resource]) {
      dispatch({
        type: 'ADD_RESOURCE',
        resource,
        value: { cuid: cuid(), ...value }
      })
    }
  }

  dispatch({
    type: 'UPDATE_LOCATION',
    value: { 
      name: resp.name, 
      description: resp.description,
      id: resp.id,
      menuId: resp.menus[0].id
     }
  })
}
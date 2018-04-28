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
        value: {cuid: cuid(), ...value}
      })
    }
  }

  dispatch({
    type: 'UPDATE_LOCATION_NAME',
    value: resp.name
  })

  dispatch({
    type: 'UPDATE_LOCATION_DESCRIPTION',
    value: resp.description
  })
}
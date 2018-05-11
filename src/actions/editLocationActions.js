import cuid from 'cuid'
import { authorizationToken } from './'

export function fetchLocation(id) {
  return dispatch => {
    dispatch({ type: 'LOADING_EDIT_LOCATION' })
    return fetch(`/locations/${id}?edit=true`)
      .then(resp => resp.json())
      .then(resp => {
        handleResp(resp, dispatch)
      })
  }
}

function handleResp(resp, dispatch) {
  const resources = {}

  for (let resource of ['categories', 'items', 'options']) {
    resources[resource] = resp[resource].map(value => ({ cuid: cuid(), ...value }))
  }

  dispatch({
    type: 'UPDATE_LOCATION',
    value: {
      name: resp.name,
      description: resp.description,
      id: resp.id,
      menuId: resp.menu.id,
      ...resources
    }
  })

  dispatch({ type: 'LOADED_EDIT_LOCATION' })
}

export function patchLocation() {
  return (dispatch, getState) => {
    const state = getState().locationNew
    const options = {
      method: 'PATCH',
      body: JSON.stringify({ location: state }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationToken()
      }
    }

    return fetch(`/locations/${state.id}`, options)
      .then(resp => resp.json())
      .then(resp => {
        dispatch({ type: 'RESET_LOCATION' })
        handleResp(resp, dispatch)
      })
  }
}

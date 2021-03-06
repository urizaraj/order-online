import mapKeys from 'lodash/mapKeys'
import snakeCase from 'lodash/snakeCase'
import camelCase from 'lodash/camelCase'
import pickBy from 'lodash/pickBy'
import { authorizationToken, respToJson } from './'

const mapperCamel = (value, key) => camelCase(key)
const valueTrue = (value, key) => value

const mapKeysSnake = rest => {
  return mapKeys(pickBy(rest, valueTrue), (value, key) => snakeCase(key))
}

export const checkOut = () => ({ type: 'CHECK_OUT' })

function orderToCamel(resp) {
  const { order_items, ...rest } = resp
  return {
    ...mapKeys(rest, mapperCamel),
    orderItems: order_items.map(oi => mapKeys(oi, mapperCamel))
  }
}

function orderToSnake(state, locationId) {
  const { orderItems, ...rest } = state
  return {
    ...mapKeysSnake(rest),
    location_id: locationId,
    order_items_attributes: orderItems.map(oi => {
      const { selectedOptions, ...rest } = oi
      return {
        ...mapKeysSnake(rest),
        selected_options_attributes: selectedOptions.map(mapKeysSnake)
      }
    })
  }
}

export function fetchOrder(id) {
  return dispatch => {
    dispatch({ type: 'LOADING_ORDER' })
    return fetch(`/orders/${id}`)
      .then(respToJson)
      .then(resp => {
        const order = orderToCamel(resp)
        dispatch({ type: 'FETCH_ORDER', order })
      })
      .catch(error => console.log(error.message))
  }
}

export function fetchOrderIndex(page = 1) {
  return (dispatch, getState) => {
    const user = getState().user

    if (!user.signedIn) return

    dispatch({ type: 'LOADING_ORDER' })

    const options = { headers: { Authorization: authorizationToken() } }

    fetch(`/orders?page=${page}`, options)
      .then(resp => resp.json())
      .then(resp => {
        dispatch({ type: 'FETCH_ORDER_INDEX', index: resp })
      })
  }
}

export function saveOrder() {
  return (dispatch, getState) => {
    dispatch({ type: 'SAVING_ORDER' })
    const order = orderToSnake(getState().orderNew, getState().locations.location.id)
    const options = {
      method: 'POST',
      body: JSON.stringify({ order }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationToken()
      }
    }

    return fetch('/orders.json', options)
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw new Error()
        }
      })
      .then(resp => {
        if (resp.status) {
          dispatch({ type: 'ORDER_SAVED' })
        } else {
          console.log(resp.messages)
          dispatch({ type: 'ORDER_INVALID', messages: resp.messages })
        }
      })
      .catch(error => console.log(error.message))
  }
}
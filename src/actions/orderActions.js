import mapKeys from 'lodash/mapKeys'
import snakeCase from 'lodash/snakeCase'
import camelCase from 'lodash/camelCase'

const mapper = (value, key) => snakeCase(key)
const mapperCamel = (value, key) => camelCase(key)

export function fetchOrder(id) {
  return dispatch => {
    dispatch({ type: 'LOADING_ORDER' })
    return fetch(`/orders/${id}`)
      .then(resp => {
        if (resp.ok) return resp.json()
        throw new Error()
      })
      .then(resp => {
        const { order_items, ...rest } = resp
        const order = {
          ...mapKeys(rest, mapperCamel),
          orderItems: order_items.map(oi => mapKeys(oi, mapperCamel))
        }
        dispatch({
          type: 'FETCH_ORDER',
          order
        })
      })
      .catch(error => console.log(error.message))
  }
}

export function fetchOrderIndex() {
  return (dispatch, getState) => {
    const user = getState().user

    if (!user.signedIn) return

    dispatch({ type: 'LOADING_ORDER' })

    const url = '/orders'

    const options = {
      headers: {
        'Authorization': `Token token=${localStorage.getItem('token')}`
      }
    }

    fetch(url, options)
      .then(resp => resp.json())
      .then(resp => {
        dispatch({ type: 'FETCH_ORDER_INDEX', index: resp })
      })
  }
}

export const checkOut = () => ({ type: 'CHECK_OUT' })

export function saveOrder() {
  return (dispatch, getState) => {
    dispatch({ type: 'SAVING_ORDER' })

    const state = getState().orderNew

    const { orderItems, ...rest } = state

    const order = {
      ...mapKeys(rest, mapper),
      location_id: getState().locations.location.id,
      order_items_attributes: orderItems.map(oi => {
        const { selectedOptions, ...rest } = oi
        return {
          ...mapKeys(rest, mapper),
          selected_options_attributes: selectedOptions.map(so => mapKeys(so, mapper))
        }
      })
    }

    const options = {
      method: 'POST',
      body: JSON.stringify({ order }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${localStorage.getItem('token')}`
      }
    }

    return fetch('/orders.json', options)
      .then(resp => resp.text())
      .then(resp => dispatch({ type: 'ORDER_SAVED' }))
  }
}
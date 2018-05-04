import cuid from 'cuid'
import mapKeys from 'lodash/mapKeys'
import snakeCase from 'lodash/snakeCase'

export function addOrderItem(item, selectedOptions, text) {
  return {
    type: 'ADD_ORDER_ITEM',
    item: { ...item, cuid: cuid(), selectedOptions, instructions: text }
  }
}

export function removeOrderItem(cuid) {
  return {
    type: 'REMOVE_ORDER_ITEM',
    cuid
  }
}

export function saveOrder() {
  return (dispatch, getState) => {
    const order = getState().order

    if (!order.items.length) return

    dispatch({ type: 'SAVING_ORDER' })

    order.location_id = getState().locations.location.id

    const options = {
      method: 'POST',
      body: JSON.stringify({ order: order }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${localStorage.getItem('token')}`
      }
    }

    return fetch('/orders.json', options)
      .then(resp => resp.text())
      .then(resp => {
        dispatch({ type: 'ORDER_SAVED' })
      })
  }
}

export function resetOrder() {
  return {
    type: 'RESET_ORDER'
  }
}

export function fetchOrder(id) {
  return dispatch => {
    dispatch({ type: 'LOADING_ORDER' })
    return fetch(`/orders/${id}`)
      .then(resp => resp.json())
      .then(resp => {
        dispatch({
          type: 'FETCH_ORDER',
          items: resp.order_items,
          id: resp.id
        })
      })
  }
}

export function fetchOrderIndex() {
  return (dispatch, getState) => {
    const user = getState().user

    if (!user.signedIn) return

    dispatch({ type: 'LOADING_ORDER' })

    const url = `/users/${user.id}`

    fetch(url)
      .then(resp => resp.json())
      .then(resp => {
        dispatch({ type: 'FETCH_ORDER_INDEX', index: resp.orders })
      })
  }
}

export function checkOut() {
  return { type: 'CHECK_OUT' }
}

export function updateOrder(value) {
  return { type: 'UPDATE_ORDER', value }
}

const mapper = (value, key) => snakeCase(key)

export function saveOrder2() {
  return (dispatch, getState) => {
    const state = getState().orderNew

    const order = {
      ...mapKeys(state, mapper),
      order_items_attributes: state.orderItemsAttributes.map(oi => ({
        ...mapKeys(oi, mapper),
        selected_options_attributes: oi.selectedOptionsAttributes.map(so => mapKeys(so, mapper))
      }))
    }

  }
}
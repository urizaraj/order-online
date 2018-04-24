import cuid from 'cuid'

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

    const options = {
      method: 'POST',
      body: JSON.stringify({order: order}),
      headers: {
        'Content-Type': 'application/json'
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
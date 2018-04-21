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
    dispatch({ type: 'SAVING_ORDER' })
    const order = getState().order
    const options = {
      method: 'POST',
      body: order
    }
    return fetch('/orders', options)
      .then(resp => resp.json())
      .then(resp => {
        dispatch({ type: 'ORDER_SAVED' })
      })
  }
}
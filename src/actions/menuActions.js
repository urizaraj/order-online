export function fetchMenu(menuId) {
  return dispatch => {
    dispatch({ type: 'LOADING_MENU' })

    return fetch(`/menus/${menuId}`)
      .then(resp => resp.json())
      .then(resp => {
        dispatch({
          type: 'FETCH_MENU',
          categories: resp.categories
        })
      })
  }
}
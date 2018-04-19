export function fetchMenu() {
  return dispatch => {
    dispatch({ type: 'LOADING_MENU' })

    return fetch('/menus/1')
      .then(resp => resp.json())
      .then(resp => {
        dispatch({
          type: 'FETCH_MENU',
          categories: resp.categories
        })
      })
  }
}
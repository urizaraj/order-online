const menuReducer = (state = {loading: false, categories: []}, action) => {
  switch(action.type) {
    case 'LOADING_MENU':
      return {loading: true, categories: []}

    case 'FETCH_MENU':
      return {loading: false, categories: action.categories}
      
    default:
      return state
  }
}

export default menuReducer
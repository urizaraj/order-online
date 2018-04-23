const userReducer = (state = { signedIn: false, id: null, name: null }, action) => {
  switch (action.type) {
    case 'SIGNED_IN':
      return { signedIn: true, id: action.id, name: action.name }

    case 'SIGN_OUT':
      return { signedIn: false, id: null, name: null }

    default:
      return state
  }
}

export default userReducer
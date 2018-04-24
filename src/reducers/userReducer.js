const userReducer = (state = { signedIn: false, id: null, name: null, invalid: false }, action) => {
  switch (action.type) {
    case 'SIGNED_IN':
      return { signedIn: true, id: action.id, name: action.name, invalid: false }

    case 'INVALID_SIGN_IN':
      return { signedIn: false, id: null, name: null, invalid: true }

    case 'SIGN_OUT':
      return { signedIn: false, id: null, name: null, invalid: false }

    default:
      return state
  }
}

export default userReducer
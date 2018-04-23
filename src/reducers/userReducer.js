const userReducer = (state = { signedIn: false, id: null, name: null }, action) => {
  switch (action.type) {
    case 'SIGNED_IN':
      return { signedIn: true, id: action.id, name: action.name }

    default:
      return state
  }
}

export default userReducer
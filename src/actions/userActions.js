export function userSignIn(user) {
  return dispatch => {
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return fetch('/users/sign_in', options)
      .then(resp => resp.json())
      .then(resp => {
        if (resp.message) return
        const { token, ...user } = resp
        localStorage.setItem('token', token)
        dispatch({ type: 'SIGNED_IN', ...user })
      })
  }
}

export function userCheckToken() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) return

    const options = {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return fetch('/users/sign_in_token', options)
      .then(resp => resp.json())
      .then(resp => {
        if (resp.message) return
        dispatch({ type: 'SIGNED_IN', ...resp })
      })
  }
}

export function userSignOut() {
  localStorage.removeItem('token')
  return {type: 'SIGN_OUT'}
}
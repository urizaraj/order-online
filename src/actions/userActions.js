function user(path) {
  return user => {
    return dispatch => {
      const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      }
  
      return fetch(path, options)
        .then(resp => resp.json())
        .then(resp => {
          if (resp.message) return dispatch({ type: 'INVALID_SIGN_IN' })
          const { token, ...user } = resp
          localStorage.setItem('token', token)
          localStorage.setItem('userId', user.id)
          localStorage.setItem('userName', user.name)
          dispatch({ type: 'SIGNED_IN', ...user })
        })
    }
  }
}

export const userSignIn = user('/users/sign_in')
export const userSignUp = user('/users')

export function userCheckToken() {
  const token = localStorage.getItem('token')
  if (token) {
    return {
      type: 'SIGNED_IN',
      id: localStorage.getItem('userId'),
      name: localStorage.getItem('userName')
    }
  } else {
    return {
      type: 'NOT_SIGNED_IN'
    }
  }
}

export function userSignOut() {
  for (let item of ['token', 'userId', 'userName']) {
    localStorage.removeItem(item)
  }
  return { type: 'SIGN_OUT' }
}

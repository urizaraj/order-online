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
        const {token, ...user} = resp
        localStorage.setItem('token', token)
        dispatch({type: 'SIGNED_IN', ...user})
      })
  }

}
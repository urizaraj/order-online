export function authorizationToken() {
  return `Token token=${localStorage.getItem('token')}`
}

export function respToJson(resp) {
  if (resp.ok) {
    return resp.json()
  } else {
    throw new Error()
  }
}

export function post(path, data) {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorizationToken()
    }
  }

  return fetch(path, options)
    .then(respToJson)
}
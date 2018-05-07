export function authorizationToken() {
  return `Token token=${localStorage.getItem('token')}`
}
import jwtDecode from 'jwt-decode'
import config from '../config'

let _timeoutId
const _24_HOURS_IN_MS = 86400000

const TokenService = {
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token)
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY)
  },
  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY)
  },
  hasAuthToken() {    
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
  parseJwt(jwt) {
    return jwtDecode(jwt)
  },
  readJwtToken() {
    return TokenService.parseJwt(TokenService.getAuthToken())
  },
  queueCallbackBeforeExpiry(callback) {
    /* get the number of ms from now until the token expires */
   
    /*
      queue a callback that will happen 10 seconds before the token expires
      the callback is passed in as an argument so could be anything,
        in this app, the callback is for calling the refresh endpoint
    */
    _timeoutId = setTimeout(callback, _24_HOURS_IN_MS)
  },
  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoutId)
  },
}

export default TokenService

import config from '../config'
import TokenService from './token-service'

const PostApiService = {
  getPosts() {
    return fetch(config.API_ENDPOINT, {
      headers: {
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  addPost(post){
    return fetch(`${config.API_ENDPOINT}/posts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(post)
    })
    .then(res => { // is a promise
      // (!res.ok)
      // ? res.json().then(e => Promise.reject(e))
      // : return res.json()
      if (!res.ok) {
        res.json().then(e => Promise.reject(e))
      }
      return res.json()
    })
  },
  postStyle(post) {
    return fetch(`${config.API_ENDPOINT}/styles`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(post)
    })
    .then(res => {
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
  },
  saveStyle(styles) {
    return fetch(`${config.API_ENDPOINT}/styles`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `basic ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(styles)
    })
    .then(res => {
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    })
  }
}

export default PostApiService

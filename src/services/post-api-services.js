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
    return fetch(config.API_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
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
    return fetch(`${config.SAVE_ENDPOINT}`, {
      method: 'POST',
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

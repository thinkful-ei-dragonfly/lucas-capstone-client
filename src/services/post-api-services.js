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
    .then(res => {
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
    const { post } = styles
    return fetch(`${config.API_ENDPOINT}/styles/${post}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(styles)
    })
    .then(res => {
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
    .then(response => console.log(response.json()))
  }
}

export default PostApiService

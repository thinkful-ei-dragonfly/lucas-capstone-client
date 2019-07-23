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
       return res.json().then(e => Promise.reject(e)) //Notice the return
     }
     return res.json()
   })
  },
  updatePost(post) {
    const { id } = post
    return fetch(`${config.API_ENDPOINT}/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(post)
    })
  },
  deletePost(id) {
    return fetch(`${config.API_ENDPOINT}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
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
  },
  deleteStyle(id) {
    return fetch(`${config.API_ENDPOINT}/styles/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
  },
}

export default PostApiService

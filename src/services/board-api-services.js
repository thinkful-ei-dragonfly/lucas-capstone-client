import config from '../config'
import TokenService from './token-service'

const BoardApiService = {
  getBoards() {
    return fetch(`${config.API_ENDPOINT}/boards`)
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  addBoard(board){
    return fetch(`${config.API_ENDPOINT}/boards`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(board)
    })
    .then(res => {
     if (!res.ok) {
       return res.json().then(e => Promise.reject(e)) //Notice the return
     }
     return res.json()
   })
  },
  updateBoard(board) {
    const { id } = board
    return fetch(`${config.API_ENDPOINT}/boards/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(board)
    })
  },
  deleteBoard(id) {
    return fetch(`${config.API_ENDPOINT}/boards/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
  },
}

export default BoardApiService

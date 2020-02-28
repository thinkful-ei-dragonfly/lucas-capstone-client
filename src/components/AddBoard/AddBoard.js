import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import BoardApiService from '../../services/board-api-services'


const AddBoard = () => {
  // setting state
  const [state, setState] = useState({
    board: {},
    error: null,
    success: null
  })

  // setting up history & location
  const location = useLocation()
  const history = useHistory()

  const successfulSubmission = () => {
    const destination = (location.state || {}).from || '/boards'
    history.push(destination)
  }

  const handleSubmit = e => {
    e.preventDefault()
    e.persist()
    const { title, description} = e.target
    let newBoard = {
      title: title.value,
      description: description.value
    }
    
    BoardApiService.addBoard(newBoard)
      .then(res => {
        if (!res.ok || res.status(400)) {
          setState({
            error: res.error
          })
        }
        successfulSubmission()
      })
      .catch(err => console.error(err))
  }

  return (
    <form
      className='AddBoardForm'
      onSubmit={handleSubmit}
      aria-label="Create new Board"
    >
      <div className='form-title'>
        <h2 className='form-title-header'>Create New Board</h2>
      </div>

      {state.error
        ? (
            <div className='message'>
              <p className="errorMessage red" aria-label="Error Message" role='alertdialog'>{state.error}</p>
            </div>
        )
        : ''
      }
      {state.success
        ? (
          <div className='message'>
            <p className='successMessage green' arial-label='Success Message' role='alertdialog'>{state.success}</p>
          </div>
        )
        : ''
      }
      {/* Form fields */}
      <div className='form-fields' aria-label='Post Fields'>
        <label htmlFor='title'>Board Title</label>
        <input type='text' name='title' id='title' placeholder='Enter board title'></input>
        
        <label htmlFor='description'>Board description</label>
        <textarea
          type='text'
          id='description'
          name='description'
          placeholder='Enter Board Description'
          aria-label="Board Description"
          ></textarea>
            
      </div>
      <button
        type='submit'
        className='form-submit'
        >Submit</button>
    </form>
  )
}
export default AddBoard
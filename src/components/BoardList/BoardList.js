import React, { useEffect, useState } from 'react'
import config from '../../config'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import './BoardList.scss'

const BoardList = props => {
  const [boards, setBoards] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`${config.API_ENDPOINT}/boards`)
      .then(res => {
        return res.json()
      })
      .then(boards => {
        
        setBoards(boards)
      })
      .catch(error => {
        setError(error)
        console.error(error)
      })
  }, [])

  return (
    <>
    <Header context={'BoardListPage'} />
    <section className='board-list'>
      <h2>Board List</h2>
      {error && (<p className='red'>{error}</p>)}
      {boards.length && (
        <table className='boards'>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Board Name</th>
              <th>Description</th>
              <th> </th>
            </tr>
            {boards.map(board => {
              return (
                <tr key={board.id}>
                  <td className='board-id'>{board.id}</td>
                  <td className='board-name'>{board.title}</td>
                  <td className='board-description'>{board.description}</td>
                  <td><Link to={`/boards/${board.id}`}>View/Edit</Link></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </section>
    </>

  )
} 
export default BoardList

import React, { useEffect, useState, useContext } from 'react'
import config from '../../config'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import Context from '../../contexts/Context'
import './BoardList.scss'

const BoardList = props => {
  const [boards, setBoards] = useState([])
  const [error, setError] = useState(false)
  const {setCurrentBoard} = useContext(Context)
  
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
      <h2>Spatialized Board List</h2>
        {error && (<p className='red'>{error}</p>)}
      {boards.length 
        ? (
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
                  <td><Link to={{
                    pathname: `/boards/${board.id}`,
                    state: {
                      title: board.title,
                      id: board.id
                    }
                    }}
                    onClick={() => setCurrentBoard(board)} >View/Edit</Link></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
      : (
            <h2>You have no boards created. Click <Link to={'/add-board'}>here</Link> or "New Board" in the header</h2>
      )}
    </section>
    </>

  )
} 
export default BoardList

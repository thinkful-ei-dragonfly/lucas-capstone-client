import React, {useState, useEffect, useContext} from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import config from '../../config'
import Context from '../../contexts/Context'
import TokenService from '../../services/token-service'
import IdleService from '../../services/idle-service'


const Header = props => {
  const { loggedIn, setLoggedIn } = useContext(Context)
  const history = useHistory()
  const location = useLocation()
  const {currentBoard, setCurrentBoard} = useContext(Context)
  
  const handleLogoutClick = () => {
    TokenService.clearAuthToken()
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    setLoggedIn(false)
    history.push('/login')
  }

  useEffect(() => {
    if (!currentBoard) {
      if (location.pathname.split('/')[1] === 'boards' && location.pathname.split('/')[2]) {
        fetch(`${config.API_ENDPOINT}/boards/${parseFloat(location.pathname.split('/')[2])}`)
          .then(res => {
            if (res.ok) {
              return res.json()
            }
          })
          .then(response => {
            setCurrentBoard(response)
          })
          .catch(error => {
            
            console.error(error)
          })
      }
    }
  }, [])
  
  return (
    <header className="Header">
      <h1 className="header-h1" role='banner' aria-label="App Name">
        <Link to='/'>Spatialized Sensate Journal</Link>
        {currentBoard && (
          <>
            {location.pathname.split('/')[1] !== 'add-post' && currentBoard && (<span className='board-name'> | Name: {currentBoard.title} / ID: {currentBoard.id} </span>)}
            {location.pathname.split('/')[1] === 'add-post' && currentBoard
              ? <span> | New post for {currentBoard.title} / Board ID: {currentBoard.id}</span>
              : ''}
          </>
        )}
      </h1>
        {TokenService.hasAuthToken() && (
          <nav className='logged-in'>
          {/* Board Page */}
          {currentBoard && location.pathname.split('/')[2] && (
            <>
              <Link to={'/boards'} onClick={() => setCurrentBoard(null)}>Back to Boards</Link>
              <Link to={{ pathname: '/add-post', state: currentBoard }}>New Object</Link>
            </>
          )}
          {/* Board List Page */}
          {location.pathname.split('/')[1] === 'boards' && !currentBoard && ( <Link to={'/add-board'}>New Board</Link> )}
          {/* Add Post Page */}
          {location.pathname.split('/')[1] === 'add-post' && currentBoard
            ? <Link to={`/boards/${currentBoard.id}`}>Back to {currentBoard.title}</Link>
            : ''}
          <Link
            onClick={handleLogoutClick}
            to='/'>
            Logout
          </Link>
          </nav>
        )}
    </header>
  )
}
export default Header
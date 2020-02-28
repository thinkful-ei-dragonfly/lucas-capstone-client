import React, {useState, useEffect} from 'react'
import { Link, useParams, useLocation, useRouteMatch } from 'react-router-dom'
import TokenService from '../../services/token-service'
import IdleService from '../../services/idle-service'


const Header = props => {
  const [boardPage, setBoardPage] = useState(false)
  const [boardListPage, setBoardListPage ] = useState(false)
  
  const location = useLocation()
  
  // useEffect(() => {

  // })
  
  const handleLogoutClick = () => {
    TokenService.clearAuthToken()
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.forceUpdate()
  }

  return (
    <header className="Header">
      <h1 className="header-h1" role='banner' aria-label="App Name">
        <Link to='/'>Spatialized Sensate Journal</Link>
        {location.pathname.split('/')[1] === 'boards' && (
          <>
            {location.pathname.split('/')[2] ? (<span className='board-name'> | Board ID: {location.pathname.split('/')[2]}</span>) : ''}
          </>
        )}
      </h1>
        {location.pathname.split('/')[1] === 'boards' && (
          <nav className='logged-in'>
            {location.pathname.split('/')[2] 
              ? (
                <>
                  <Link to={'/boards'}>Back to Boards</Link>
                  <Link to={'/add-post'}>New Post</Link>
                </>
              )
              : (
                <Link to = { '/add-board' }>New Board</Link>
              )}
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
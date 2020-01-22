import React from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import IdleService from '../../services/idle-service'

export default class Header extends React.Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.forceUpdate()
  }

  renderLogoutLink() {
    return (
      <div className='logged-in' role='navigation' aria-label="Authenticated User Actions">
        <nav className='logged-in'>
          <Link to={'/add-board'}>New Board</Link>
          <Link to={'/add-post'}>New Post</Link>
          <Link
            onClick={this.handleLogoutClick}
            to='/'>
            Logout
          </Link>
        </nav>
        
        
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='logged-out' role='navigation' aria-label="Header Navigation">
        <Link
          to='/login'>
          Log in
        </Link>
      </div>
    )
  }


  render() {
    return (
      <header className="Header">
        <h1 className="header-h1" role='banner' aria-label="App Name">
          <Link to='/'>Sensate Journal</Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    )
  }
}

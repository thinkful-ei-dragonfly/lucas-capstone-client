import React from 'react'
import AuthApiService from '../../services/auth-api-service'

export default class LoginForm extends React.Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error:null })
    const { user_name, password } = ev.target

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value
    })
    .then(res => {
      user_name.value = ''
      password.value = ''
      this.props.onLoginSuccess()
    })
    .catch(res => {
      this.setState({ error: res.error })
    })
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitJwtAuth}
        aria-label="Login Form"
      >
        <div role='alert' >
          {error && <p className='red' role='alertdialog' aria-label="Error Message">{error}</p>}
        </div>
        <div className='user_name'>
          <label htmlFor='LoginForm_user_name'>
            User name
          </label>
          <input
            required
            name='user_name'
            aria-label="user_name field"
            id='LoginForm_user_name'>
          </input>
        </div>
        <div className='password'>
          <label htmlFor='LoginForm_password'>
            Password
          </label>
          <input
            required
            name='password'
            aria-label="password field"
            type='password'
            id='LoginForm_password'>
          </input>
        </div>
        <button
          type='submit'
          >
          Login
        </button>
      </form>
    )
  }
}

import React, { useState, useContext } from 'react'
import Context from '../../contexts/Context'
import AuthApiService from '../../services/auth-api-service'


const LoginForm = props => {
  const [ error, setError ] = useState(null)
  // const [ authorized, setAuthorized ] = useState(false)
  const { setLoggedIn } = useContext(Context)
  

  const handleSubmitJwtAuth = e => {
    e.preventDefault()
    setError(null)

    const { user_name, password } = e.target
    const { location, history } = props

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value
    })
      .then(res => {
        user_name.value = ''
        password.value = ''
        setLoggedIn(true)
        // setAuthorized(true)
        history.push('/boards')
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }
  return (
    <form
      className='LoginForm'
      onSubmit={handleSubmitJwtAuth}
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

export default LoginForm
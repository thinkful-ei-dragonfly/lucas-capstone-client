import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'

export default class LoginPage extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
    this.props.onLogin()
  }

  render() {
    return (
      <section
          className='LoginPage'>
          <h2>Log in to Colleción</h2>
          <LoginForm
            onLoginSuccess={this.handleLoginSuccess}
          />
      </section>
    )
  }
}

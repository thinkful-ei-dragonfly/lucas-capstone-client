import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'

export default class LoginPage extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  }

  render() {
    return (
      <section
          className='LoginPage'>
          <h2>Log in to Sensate Journal</h2>
          <LoginForm
            history={this.props.history}
            location={this.props.location}
          />
      </section>
    )
  }
}

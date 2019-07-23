import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'

import LoginForm from './LoginForm'
configure({ adapter: new Adapter() });
describe('LoginForm component', () => {
  const props = {
    something: 'something'
  }

  it('renders a LoginForm by default', () => {
    const wrapper = shallow(<LoginForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('renders a form', () => {
    const form = shallow(<LoginForm/>)
    expect(toJson(form)).toMatchSnapshot()
  })
  it('renders a user_name label in the form', () => {
    const user_name = shallow(<LoginForm />)
      .find('.user_name')
    expect(toJson(user_name)).toMatchSnapshot()
  })
  it('renders a password label in the form', () => {
    const password = shallow(<LoginForm />)
      .find('.password')
    expect(toJson(password)).toMatchSnapshot()
  })
})

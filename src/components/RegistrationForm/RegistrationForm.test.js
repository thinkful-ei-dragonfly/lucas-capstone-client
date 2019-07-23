import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'

import RegistrationForm from './RegistrationForm'
configure({ adapter: new Adapter() });
describe('RegistrationForm component', () => {
  const props = {
    something: 'something'
  }

  it('renders a Component by default', () => {
    const wrapper = shallow(<RegistrationForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('renders a form', () => {
    const form = shallow(<RegistrationForm/>)
    expect(toJson(form)).toMatchSnapshot()
  })
  it('renders a full_name label in the form', () => {
    const full_name = shallow(<RegistrationForm />)
      .find('.full_name')
    expect(toJson(full_name)).toMatchSnapshot()
  })
  it('renders a user_name label in the form', () => {
    const user_name = shallow(<RegistrationForm />)
      .find('.user_name')
    expect(toJson(user_name)).toMatchSnapshot()
  })
  it('renders a password label in the form', () => {
    const password = shallow(<RegistrationForm />)
      .find('.password')
    expect(toJson(password)).toMatchSnapshot()
  })
})

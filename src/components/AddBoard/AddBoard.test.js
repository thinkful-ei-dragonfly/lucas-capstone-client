import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'

import AddBoard from './AddBoard'
configure({ adapter: new Adapter() });
describe('AddBoardForm component', () => {
  const props = {
    something: 'something'
  }

  it('renders a AddBoard by default', () => {
    const wrapper = shallow(<AddBoard />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('renders a form', () => {
    const form = shallow(<AddBoard/>)
    expect(toJson(form)).toMatchSnapshot()
  })
  it('renders a form-title label in the form', () => {
    const form_title = shallow(<AddBoard />)
      .find('.form-title')
    expect(toJson(form_title)).toMatchSnapshot()
  })
  it('renders a select label in the form', () => {
    const select = shallow(<AddBoard />)
      .find('.select')
    expect(toJson(select)).toMatchSnapshot()
  })
  it('renders a "post_type" dropdown menu', () => {
    const post_type = shallow(<AddBoard/>)
      .find('#post_type')
    expect(toJson(post_type)).toMatchSnapshot()
  })
  it('renders form fields', () => {
    const form_fields = shallow(<AddBoard/>)
      .find('.form-fields')
    expect(toJson(form_fields)).toMatchSnapshot()
  })
})

import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'

import AddPost from './AddPost'
configure({ adapter: new Adapter() });
describe('AddPostForm component', () => {
  const props = {
    something: 'something'
  }

  it('renders a AddPost by default', () => {
    const wrapper = shallow(<AddPost />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('renders a form', () => {
    const form = shallow(<AddPost/>)
    expect(toJson(form)).toMatchSnapshot()
  })
  it('renders a form-title label in the form', () => {
    const form_title = shallow(<AddPost />)
      .find('.form-title')
    expect(toJson(form_title)).toMatchSnapshot()
  })
  it('renders a select label in the form', () => {
    const select = shallow(<AddPost />)
      .find('.select')
    expect(toJson(select)).toMatchSnapshot()
  })
  it('renders a "post_type" dropdown menu', () => {
    const post_type = shallow(<AddPost/>)
      .find('#post_type')
    expect(toJson(post_type)).toMatchSnapshot()
  })
  it('renders form fields', () => {
    const form_fields = shallow(<AddPost/>)
      .find('.form-fields')
    expect(toJson(form_fields)).toMatchSnapshot()
  })
})

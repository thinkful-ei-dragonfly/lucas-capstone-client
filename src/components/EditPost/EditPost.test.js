import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'

import EditPost from './EditPost'
configure({ adapter: new Adapter() });
describe('EditPost component', () => {
  const props = {
    match: {
      params: {
        post_id: "a2c7df25-b59a-4769-809a-9c9517c0e7ce"
      }
    }
  }

  it('renders a EditPost by default', () => {
    const wrapper = shallow(<EditPost {...props}/>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('renders a form', () => {
    const form = shallow(<EditPost {...props}/>)
    expect(toJson(form)).toMatchSnapshot()
  })
  it('renders a form-title label in the form', () => {
    const form_title = shallow(<EditPost {...props}/>)
      .find('.form-title')
    expect(toJson(form_title)).toMatchSnapshot()
  })
  it('renders a select label in the form', () => {
    const select = shallow(<EditPost {...props}/>)
      .find('.select')
    expect(toJson(select)).toMatchSnapshot()
  })
  it('renders a "post_type" dropdown menu', () => {
    const post_type = shallow(<EditPost {...props}/>)
      .find('#post_type')
    expect(toJson(post_type)).toMatchSnapshot()
  })
  it('renders form fields', () => {
    const form_fields = shallow(<EditPost {...props}/>)
      .find('.form-fields')
    expect(toJson(form_fields)).toMatchSnapshot()
  })
})

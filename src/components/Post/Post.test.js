import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'

import Post from './Post'
configure({ adapter: new Adapter() });
describe('Post component', () => {
  const state = {
    style: {
      left_style: 10,
      top_style: 10,
      width_style: 200,
      height_style: 300
    }
  }
  const props = {
    match: {
      params: {
        post_id: "a2c7df25-b59a-4769-809a-9c9517c0e7ce"
      }
    },
    post: {
      type: "Text"
    }
  }

  it('renders a Post by default', () => {
    const wrapper = shallow(<Post {...props} {...state}/>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('renders the post Type as a class', () => {
    const text_post = shallow(<Post {...props} {...state}/>)
      .find('.Text-post')
    expect(toJson(text_post)).toMatchSnapshot()
  })
})

import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'

import Header from './Header'
configure({ adapter: new Adapter() });
describe('Header component', () => {
  const props = {
    something: 'something'
  }

  it('renders a Header by default', () => {
    const wrapper = shallow(<Header />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('renders a h1 with app name', () => {
    const h1 = shallow(<Header />)
      .find('.header-h1')
    expect(toJson(h1)).toMatchSnapshot()
  })
})

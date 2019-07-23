import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'

import OnBoard from './OnBoard'
configure({ adapter: new Adapter() });
describe('OnBoard component', () => {

  it('renders an OnBoard by default', () => {
    const wrapper = shallow(<OnBoard />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('renders a Header', () => {
    const onboarding_header = shallow(<OnBoard />)
      .find('.onboarding-header')
    expect(toJson(onboarding_header)).toMatchSnapshot()
  })
  it('renders an h1 in the header', () => {
    const onboarding_heading_text = shallow(<OnBoard />)
      .find('.onboarding-heading-text')
    expect(toJson(onboarding_heading_text)).toMatchSnapshot()
  })
  it('renders the onboarding-content section', () => {
    const onboarding_content = shallow(<OnBoard />)
      .find('.onboarding-content')
    expect(toJson(onboarding_content)).toMatchSnapshot()
  })
})

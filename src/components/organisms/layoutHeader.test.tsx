import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { LayoutHeader } from './LayoutHeader';

describe('LayoutHeader', () => {
  test('is rendered', () => {
    const wrapper = shallow(<LayoutHeader />);
    expect(wrapper).toBeTruthy();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

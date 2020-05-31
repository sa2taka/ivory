import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { TitleLogo } from './index';

describe('TitleLogo', () => {
  test('is rendered', () => {
    const wrapper = shallow(<TitleLogo />);
    expect(wrapper).toBeTruthy();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

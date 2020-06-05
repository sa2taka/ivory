import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Button } from './index';

describe('Button', () => {
  test('is rendered', () => {
    const wrapper = shallow(<Button>button</Button>);
    expect(wrapper).toBeTruthy();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from './index';
import { isAuthorized } from '@/utils/Authorization/Mastodon/authorization';

jest.mock('@/utils/Authorization/Mastodon/authorization');

describe('PrivateRoute', () => {
  test('render child if mastodon is authorized', () => {
    (isAuthorized as jest.Mock).mockReturnValue(Promise.resolve(true));
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/']}>
        <PrivateRoute path="/">renderd</PrivateRoute>
      </MemoryRouter>
    );
    expect(wrapper.html()).toBe('renderd');
  });

  test('render redirect if mastodon is not authorized', () => {
    (isAuthorized as jest.Mock).mockReturnValue(Promise.resolve(false));

    const wrapper = shallow(
      <MemoryRouter initialEntries={['/']}>
        <PrivateRoute path="/">renderd</PrivateRoute>
      </MemoryRouter>
    );

    const realUseState = React.useState;
    // Stub the initial state
    const stubInitialState = false;

    jest
      .spyOn(React, 'useState')
      // @ts-ignore
      .mockImplementationOnce(() => realUseState(stubInitialState));
    jest
      .spyOn(React, 'useState')
      // @ts-ignore
      .mockImplementationOnce(() => realUseState(stubInitialState));

    const html = wrapper.html();
    expect(html).not.toBe('renderd');
  });
});

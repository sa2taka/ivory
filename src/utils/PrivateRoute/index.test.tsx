import React from 'react';
import { shallow, render } from 'enzyme';
import { MemoryRouter, Router } from 'react-router-dom';
import { PrivateRoute } from './index';
import { isAuthorized } from '@/utils/Authorization/Mastodon/authorization';
import { createMemoryHistory } from 'history';

jest.mock('@/utils/Authorization/Mastodon/authorization');

describe('PrivateRoute', () => {
  test('render child if mastodon is authorized', () => {
    (isAuthorized as jest.Mock).mockReturnValue(true);
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/']}>
        <PrivateRoute path="/">renderd</PrivateRoute>
      </MemoryRouter>
    );
    expect(wrapper.html()).toBe('renderd');
  });

  test('render redirect if mastodon is not authorized', () => {
    (isAuthorized as jest.Mock).mockReturnValue(false);
    const history = createMemoryHistory({
      initialEntries: ['/'],
    });
    const wrapper = render(
      <Router history={history}>
        <PrivateRoute path="/">renderd</PrivateRoute>
      </Router>
    );
    expect(wrapper.html()).not.toBe('renderd');
  });
});

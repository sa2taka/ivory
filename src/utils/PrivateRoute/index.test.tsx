import React from 'react';
import { shallow, render } from 'enzyme';
import { MemoryRouter, Router } from 'react-router-dom';
import { PrivateRoute } from './index';
import { MastodonAuthorization } from '@/utils/Authorization/Mastodon/authorization';
import { createMemoryHistory, MemoryHistory } from 'history';
import toJson from 'enzyme-to-json';

jest.mock('@/utils/Authorization/Mastodon/authorization');

describe('PrivateRoute', () => {
  test('render child if mastodon is authorized', () => {
    (MastodonAuthorization.isAuthorized as jest.Mock).mockReturnValue(true);
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/']}>
        <PrivateRoute path="/">renderd</PrivateRoute>
      </MemoryRouter>
    );
    expect(wrapper.html()).toBe('renderd');
  });

  test('render redirect if mastodon is not authorized', () => {
    (MastodonAuthorization.isAuthorized as jest.Mock).mockReturnValue(false);
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

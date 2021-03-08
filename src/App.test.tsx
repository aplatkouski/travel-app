import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import store from 'States/root-store';
import App from './App';

test('renders App', () => {
  const fetchCountries = jest.fn();
  const { getAllByText } = render(
    <Provider store={store}>
      <App fetchCountries={fetchCountries} />
    </Provider>
  );

  expect(getAllByText(/Login/i)).toHaveLength(1);
});

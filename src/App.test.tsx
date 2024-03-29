import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import store from 'States/root-store';
import App from './App';

test('renders App', () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getAllByText(/Log in/i)).toHaveLength(1);
  expect(getAllByText(/Countries/i)).toHaveLength(1);
});

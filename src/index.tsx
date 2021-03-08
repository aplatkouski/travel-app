import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import store from 'States/root-store';
import { Provider } from 'react-redux';
import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
    ,
  </Provider>,
  rootElement
);

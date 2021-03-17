import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './root-reducer';

const composedEnhancer = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const store = createStore(
  rootReducer,
  composedEnhancer(applyMiddleware(loggerMiddleware, thunkMiddleware))
);

store.subscribe(() => {
  localStorage.setItem('travel-app', JSON.stringify(store.getState().languageSelector));
});

export default store;

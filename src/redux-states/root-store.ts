import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { IState as ILanguageSelectorState } from 'States/language-selector/model';
import { rootReducer } from './root-reducer';

const composedEnhancer = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const preloadedLanguage = {
  languageSelector: localStorage.languageSelector
    ? (JSON.parse(localStorage.languageSelector) as ILanguageSelectorState)
    : undefined,
};

const store = createStore(
  rootReducer,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  preloadedLanguage,
  composedEnhancer(applyMiddleware(loggerMiddleware, thunkMiddleware))
);

store.subscribe(() => {
  localStorage.languageSelector = JSON.stringify(store.getState().languageSelector);
});

export default store;

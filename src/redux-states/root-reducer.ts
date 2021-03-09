import { combineReducers } from 'redux';
import languageSelector from 'States/language-selector';

const rootReducer = combineReducers({
  languageSelector: languageSelector.reducer,
});

export default rootReducer;

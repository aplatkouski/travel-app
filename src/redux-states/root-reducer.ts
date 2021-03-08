import { combineReducers } from 'redux';
import countries from 'States/countries';
import languageSelector from 'States/language-selector';

const rootReducer = combineReducers({
  countries: countries.reducer,
  languageSelector: languageSelector.reducer,
});

export default rootReducer;

import { combineReducers } from 'redux';
import countries from 'States/countries';
import languageSelector from 'States/language-selector';
import searchField from 'States/search-field';

const rootReducer = combineReducers({
  countries: countries.reducer,
  languageSelector: languageSelector.reducer,
  searchField: searchField.reducer,
});

export default rootReducer;

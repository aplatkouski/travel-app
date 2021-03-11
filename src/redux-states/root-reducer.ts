import { combineReducers } from 'redux';
import countries from 'States/countries';
import country from 'States/country';
import languageSelector from 'States/language-selector';
import searchField from 'States/search-field';

const rootReducer = combineReducers({
  countries: countries.reducer,
  country: country.reducer,
  languageSelector: languageSelector.reducer,
  searchField: searchField.reducer,
});

export default rootReducer;

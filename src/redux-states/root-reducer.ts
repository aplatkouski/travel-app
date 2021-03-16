import { combineReducers } from 'redux';
import countries from 'States/countries';
import country from 'States/country';
import languageSelector from 'States/language-selector';
import searchField from 'States/search-field';
import currency from 'States/currency';
import user from 'States/user';
import weather from 'States/weather';

export const rootReducer = combineReducers({
  countries: countries.reducer,
  country: country.reducer,
  languageSelector: languageSelector.reducer,
  searchField: searchField.reducer,
  currency: currency.reducer,
  user: user.reducer,
  weather: weather.reducer,
});

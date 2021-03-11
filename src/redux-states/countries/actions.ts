import type { Countries, ICountry } from 'Entities/country';
import type ID from 'Entities/id';
import * as StateTypes from 'States/types';
import storage from 'Utils/storage';
import * as t from './action-types';
import { IState } from './model';

const fetchFailure = (error: Error): StateTypes.IAction<Error> => ({
  type: t.FETCH.FAILURE,
  payload: error,
});

const fetchCountriesSuccess = (countries: Countries) => ({
  type: t.FETCH_COUNTRIES_SUCCESS,
  payload: countries,
});

const fetchCountrySuccess = (country: ICountry) => ({
  type: t.FETCH_COUNTRY_SUCCESS,
  payload: country,
});

export const startRequest = (): StateTypes.IAction<undefined> => ({
  type: t.FETCH.START,
  payload: undefined,
});

export const fetchCountries = (): StateTypes.AsyncDispatch<IState, any> => async (
  dispatch,
  getState
) => {
  startRequest();
  const { languageSelector } = getState();
  try {
    const countries = await storage.fetchCountries(languageSelector.language);
    dispatch(fetchCountriesSuccess(countries));
  } catch (error) {
    if (error) {
      dispatch(fetchFailure(error));
    }
  }
};

export const selectCountry = (id: ID): StateTypes.AsyncDispatch<IState, any> => async (
  dispatch,
  getState
) => {
  startRequest();
  const {
    languageSelector: { language },
  } = getState();
  try {
    const country = await storage.fetchCountry({
      id,
      language,
    });
    dispatch(fetchCountrySuccess(country));
  } catch (error) {
    if (error) {
      dispatch(fetchFailure(error));
    }
  }
};

import { ICountry } from 'Entities/country';
import type { ID } from 'Entities/travel-app';
import * as StateTypes from 'States/types';
import { api, countryAPI } from '../../constants';
import { fetchFailure, fetchSuccess, startRequest } from './actions';
import { IState } from './model';

export const getCountryThunk = (id: ID): StateTypes.AsyncDispatch<IState, any> => async (
  dispatch,
  getState
) => {
  const {
    languageSelector: { language },
    country: { country: currentCountry },
  } = getState();
  if (currentCountry && currentCountry.id === id) return;
  dispatch(startRequest());
  try {
    const data = {
      countryID: id,
      reloadLang: language,
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${api}/${countryAPI}`, options);
    const country = (await response.json()) as ICountry;
    dispatch(fetchSuccess(country));
  } catch (error) {
    if (error) {
      dispatch(fetchFailure(error));
    }
  }
};

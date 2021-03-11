import { api, countriesAPI, countriesPerPage } from 'App/constants';
import { Countries } from 'Entities/country';
import * as StateTypes from 'States/types';
import { fetchFailure, fetchSuccess, startRequest } from './actions';
import { IState } from './model';

export const getCountriesThunk = (): StateTypes.AsyncDispatch<IState, any> => async (
  dispatch,
  getState
) => {
  dispatch(startRequest());
  const { languageSelector } = getState();
  try {
    const data = {
      countriesNum: countriesPerPage,
      reloadLang: languageSelector.language,
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${api}/${countriesAPI}`, options);
    const countries = (await response.json()) as Countries;
    dispatch(fetchSuccess(countries));
  } catch (error) {
    if (error) {
      dispatch(fetchFailure(error));
    }
  }
};

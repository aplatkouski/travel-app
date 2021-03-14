import { ICountry } from 'Entities/country';
import { ID } from 'Entities/travel-app';
import * as StateTypes from 'States/types';
import { api, countryAPI } from '../../constants';
import { fetchFailure, fetchSuccess, startRequest } from './actions';
import { IState } from './model';

export const getCountyInfoThunk = (id: ID): StateTypes.AsyncDispatch<IState, any> => async (dispatch, getState) => {
  dispatch(startRequest());
  const { languageSelector } = getState();
  try {
    const data = {
      countryID: id,
      reloadLang: (languageSelector as any).language,
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

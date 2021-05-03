import { ICountry } from 'Entities/country';
import * as StateTypes from 'States/types';
import * as t from './action-types';

export const fetchFailure = (error: Error): StateTypes.IAction<Error> => ({
  type: t.FETCH_COUNTRY.FAILURE,
  payload: error,
});

export const fetchSuccess = (country: ICountry): StateTypes.IAction<ICountry> => ({
  type: t.FETCH_COUNTRY.SUCCESS,
  payload: country,
});

export const startRequest = (): StateTypes.IAction<undefined> => ({
  type: t.FETCH_COUNTRY.START,
  payload: undefined,
});

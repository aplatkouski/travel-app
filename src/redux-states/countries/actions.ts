import { Countries } from 'Entities/country';
import * as StateTypes from 'States/types';
import * as t from './action-types';

export const fetchFailure = (error: Error): StateTypes.IAction<Error> => ({
  type: t.FETCH_COUNTRIES.FAILURE,
  payload: error,
});

export const fetchSuccess = (countries: Countries): StateTypes.IAction<Countries> => ({
  type: t.FETCH_COUNTRIES.SUCCESS,
  payload: countries,
});

export const startRequest = (): StateTypes.IAction<undefined> => ({
  type: t.FETCH_COUNTRIES.START,
  payload: undefined,
});

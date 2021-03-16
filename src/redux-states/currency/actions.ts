import * as StateTypes from 'States/types';
import { ICurrency } from 'States/currency/reducer';
import * as t from './action-types';

export const startRequest = (): StateTypes.IAction<undefined> => ({
  type: t.FETCH_CURRENCY.START,
  payload: undefined,
});

export const fetchSuccess = (currencies: ICurrency[]): StateTypes.IAction<ICurrency[]> => ({
  type: t.FETCH_CURRENCY.SUCCESS,
  payload: currencies,
});

export const fetchFailure = (error: Error): StateTypes.IAction<Error> => ({
  type: t.FETCH_CURRENCY.FAILURE,
  payload: error,
});

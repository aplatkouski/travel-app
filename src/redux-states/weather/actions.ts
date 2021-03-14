import IWeather from 'Entities/weather';
import * as StateTypes from 'States/types';
import * as t from './action-types';

export const fetchFailure = (error: Error): StateTypes.IAction<Error> => ({
  type: t.FETCH_WEATHER.FAILURE,
  payload: error,
});

export const fetchSuccess = (weather: IWeather): StateTypes.IAction<IWeather> => ({
  type: t.FETCH_WEATHER.SUCCESS,
  payload: weather,
});

export const startRequest = (): StateTypes.IAction<undefined> => ({
  type: t.FETCH_WEATHER.START,
  payload: undefined,
});

import * as StateTypes from 'States/types';
import storage from 'Utils/storage';
import * as t from './action-types';
import { IState } from './model';

const fetchFailure = (error: Error): StateTypes.IAction<Error> => ({
  type: t.FETCH_FAILURE,
  payload: error,
});

const fetchSuccess = (countries: Array<any>) => ({
  type: t.FETCH_SUCCESS,
  payload: countries,
});

export const startRequest = (): StateTypes.IAction<undefined> => ({
  type: t.START_REQUEST,
  payload: undefined,
});

export const fetchCountries = (): StateTypes.AsyncDispatch<IState, any> => async (dispatch) => {
  startRequest();
  try {
    const countries = await storage.fetchCountries();
    dispatch(fetchSuccess(countries));
  } catch (error) {
    if (error) {
      dispatch(fetchFailure(error));
    }
  }
};

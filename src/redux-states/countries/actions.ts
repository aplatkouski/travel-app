import type { Countries } from 'Entities/country';
import { IDBCountries } from 'Entities/country';
import ID from 'Entities/id';
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

const parseCounties = (countries: IDBCountries): Countries => {
  return countries.map((country) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id, ...rest } = country;
    return {
      id: _id,
      ...rest,
    };
  });
};

export const fetchCountries = (): StateTypes.AsyncDispatch<IState, any> => async (dispatch) => {
  startRequest();
  try {
    const countries = await storage.fetchCountries();
    dispatch(fetchSuccess(parseCounties(countries)));
  } catch (error) {
    if (error) {
      dispatch(fetchFailure(error));
    }
  }
};

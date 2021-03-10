import type { Countries, DBCountries } from 'Entities/country';
import type ID from 'Entities/id';
import * as StateTypes from 'States/types';
import storage from 'Utils/storage';
import * as t from './action-types';
import { IState } from './model';

const fetchFailure = (error: Error): StateTypes.IAction<Error> => ({
  type: t.FETCH_COUNTRIES.FAILURE,
  payload: error,
});

const fetchSuccess = (countries: Array<any>) => ({
  type: t.FETCH_COUNTRIES.SUCCESS,
  payload: countries,
});

export const startRequest = (): StateTypes.IAction<undefined> => ({
  type: t.FETCH_COUNTRIES.START,
  payload: undefined,
});

const parseCounties = (countries: DBCountries): Countries => {
  return countries.map((country) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id, ...rest } = country;
    return {
      id: _id,
      ...rest,
    };
  });
};

export const fetchCountries = (): StateTypes.AsyncDispatch<IState, any> => async (
  dispatch
) => {
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

export const selectCountry = (id: ID): StateTypes.IAction<ID> => ({
  type: t.SELECT_COUNTRY,
  payload: id,
});

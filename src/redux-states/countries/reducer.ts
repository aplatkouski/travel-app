import type { Countries } from 'Entities/country';
import { ICountry } from 'Entities/country';
import * as StateTypes from 'States/types';
import * as t from './action-types';
import { IState } from './model';

const initialState: IState = {
  all: [] as Countries,
  error: undefined,
  isLoading: false,
  selected: undefined,
};

const handlers: StateTypes.IHandlers<IState, any> = {
  [t.FETCH.FAILURE]: (state, { payload: error }: StateTypes.IAction<Error>) => ({
    ...state,
    isLoading: false,
    error,
  }),
  [t.FETCH.START]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [t.FETCH_COUNTRIES_SUCCESS]: (
    state,
    { payload: countries }: StateTypes.IAction<Countries>
  ) => ({
    ...state,
    isLoading: false,
    all: countries,
  }),
  [t.FETCH_COUNTRY_SUCCESS]: (
    state,
    { payload: country }: StateTypes.IAction<ICountry>
  ) => ({
    ...state,
    selected: country,
  }),
  DEFAULT: (state) => state,
};

const reducer: StateTypes.Reducer<IState, any> = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default reducer;

import type { Countries } from 'Entities/country';
import type ID from 'Entities/id';
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
  [t.FETCH_COUNTRIES.FAILURE]: (
    state,
    { payload: error }: StateTypes.IAction<Error>
  ) => ({
    ...state,
    isLoading: false,
    error,
  }),
  [t.FETCH_COUNTRIES.START]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [t.FETCH_COUNTRIES.SUCCESS]: (
    state,
    { payload: countries }: StateTypes.IAction<Countries>
  ) => ({
    ...state,
    isLoading: false,
    all: countries,
  }),
  [t.SELECT_COUNTRY]: (state, { payload: id }: StateTypes.IAction<ID>) => ({
    ...state,
    // eslint-disable-next-line no-underscore-dangle
    selected: state.all.find((country) => country.id === id),
  }),
  DEFAULT: (state) => state,
};

const reducer: StateTypes.Reducer<IState, any> = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default reducer;

import type { Countries } from 'Entities/country';
import * as StateTypes from 'States/types';
import * as t from './action-types';
import { IState } from './model';

const initialState: IState = {
  all: [] as Countries,
  error: undefined,
  isLoading: false,
};

const handlers: StateTypes.IHandlers<IState, any> = {
  [t.FETCH_FAILURE]: (state, { payload: error }: StateTypes.IAction<typeof Error>) => ({
    ...state,
    isLoading: false,
    error,
  }),
  [t.FETCH_SUCCESS]: (state, { payload: countries }: StateTypes.IAction<Countries>) => ({
    ...state,
    isLoading: false,
    all: countries,
  }),
  [t.START_REQUEST]: (state) => ({
    ...state,
    isLoading: true,
  }),
  DEFAULT: (state) => state,
};

const reducer: StateTypes.Reducer<IState, any> = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default reducer;

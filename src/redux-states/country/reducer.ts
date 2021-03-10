import { Countries } from 'Entities/country';
import * as StateTypes from 'States/types';
import * as t from './action-types';

export interface IState {
  payload: any;
  error?: typeof Error;
  isLoading: boolean;
}

const initialState: IState = {
  payload: undefined,
  error: undefined,
  isLoading: false,
};

const handlers: StateTypes.IHandlers<IState, any> = {
  [t.FETCH_COUNTRY.FAILURE]: (state, { payload: error }: StateTypes.IAction<typeof Error>) => ({
    ...state,
    isLoading: false,
    error,
  }),
  [t.FETCH_COUNTRY.START]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [t.FETCH_COUNTRY.SUCCESS]: (state, { payload }: StateTypes.IAction<Countries>) => ({
    ...state,
    isLoading: false,
    payload,
  }),
  DEFAULT: (state) => state,
};

const reducer: StateTypes.Reducer<IState, any> = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default reducer;

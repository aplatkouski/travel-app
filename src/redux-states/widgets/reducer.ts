import * as StateTypes from 'States/types';
import * as t from './action-types';

export interface ICurrency {
  base_code: string; // currency EUR RUB USD
  conversion_rate: number;
  documentation: string;
  result: string;
  target_code: string; // local currency
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
}

export interface IState {
  payload?: ICurrency[];
  error?: Error;
  isLoading: boolean;
}

const initialState: IState = {
  payload: undefined,
  error: undefined,
  isLoading: false,
};

const handlers: StateTypes.IHandlers<IState, any> = {
  [t.FETCH_CURRENCY.START]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [t.FETCH_CURRENCY.SUCCESS]: (state, { payload }: StateTypes.IAction<ICurrency[]>) => ({
    ...state,
    isLoading: false,
    payload,
  }),
  [t.FETCH_CURRENCY.FAILURE]: (state, { payload: error }: StateTypes.IAction<Error>) => ({
    ...state,
    isLoading: false,
    error,
  }),
  DEFAULT: (state) => state,
};

const reducer: StateTypes.Reducer<IState, any> = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default reducer;

import * as StateTypes from 'States/types';
import { ICurrency, IState } from './model';
import * as t from './action-types';

const initialState: IState = {
  payload: [],
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

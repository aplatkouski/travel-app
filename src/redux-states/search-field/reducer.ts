import * as StateTypes from 'States/types';
import * as t from './action-types';
import type { IState } from './model';

const initialState: IState = {
  value: '',
};

const handlers: StateTypes.IHandlers<IState, any> = {
  [t.CHANGE]: (state, { payload: value }: StateTypes.IAction<string>) => ({
    ...state,
    value,
  }),
  DEFAULT: (state) => state,
};

const reducer: StateTypes.Reducer<IState, any> = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default reducer;

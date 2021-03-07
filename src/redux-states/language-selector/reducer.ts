import Language from 'Entities/laguage';
import * as StateTypes from 'States/types';
import * as t from './action-types';
import type { IState } from './model';

const initialState: IState = {
  language: 'en' as Language,
};

const handlers: StateTypes.IHandlers<IState, any> = {
  [t.SELECT]: (state, { payload: language }: StateTypes.IAction<Language>) => ({
    ...state,
    language,
  }),
  DEFAULT: (state) => state,
};

const reducer: StateTypes.Reducer<IState, any> = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default reducer;

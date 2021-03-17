import { Language } from 'Entities/travel-app';
import * as StateTypes from 'States/types';
import * as t from './action-types';
import { IState } from './model';

const saved = localStorage.getItem('travel-app');
const initialLanguage = saved
  ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (JSON.parse(saved).language as Language)
  : ('en' as Language);

const initialState: IState = {
  language: initialLanguage,
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

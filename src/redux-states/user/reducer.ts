import * as StateTypes from 'States/types';
import * as t from './action-types';
import { IState } from './model';

const initialState: IState = {
  error: undefined,
  isLoading: false,
  isOpenAuthorizationForm: false,
  isOpenRegistrationForm: false,
  message: undefined,
  current: undefined,
};

const handlers: StateTypes.IHandlers<IState, any> = {
  [t.AUTHORIZATION_FORM.CLOSE]: (state) => ({
    ...state,
    isOpenAuthorizationForm: false,
  }),
  [t.AUTHORIZATION_FORM.OPEN]: (state) => ({
    ...state,
    isOpenAuthorizationForm: true,
  }),
  [t.REGISTRATION_FORM.CLOSE]: (state) => ({
    ...state,
    isOpenRegistrationForm: false,
  }),
  [t.REGISTRATION_FORM.OPEN]: (state) => ({
    ...state,
    isOpenRegistrationForm: true,
  }),
  DEFAULT: (state) => state,
};

const reducer: StateTypes.Reducer<IState, any> = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default reducer;

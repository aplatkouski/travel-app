import type { ILogInErrors, IUser } from 'Entities/user';
import * as StateTypes from 'States/types';
import * as t from './action-types';
import { IState } from './model';

const initialState: IState = {
  current: undefined,
  error: undefined,
  isLoading: false,
  isOpenLogInForm: false,
  isOpenRegistrationForm: false,
  logInErrors: undefined,
  message: undefined,
};

const handlers: StateTypes.IHandlers<IState, any> = {
  [t.LOG_IN_FORM.CLOSE]: (state) => ({
    ...state,
    logInErrors: undefined,
    isOpenLogInForm: false,
  }),
  [t.LOG_IN_FORM.OPEN]: (state) => ({
    ...state,
    isOpenLogInForm: true,
  }),
  [t.REGISTRATION_FORM.CLOSE]: (state) => ({
    ...state,
    isOpenRegistrationForm: false,
  }),
  [t.REGISTRATION_FORM.OPEN]: (state) => ({
    ...state,
    isOpenRegistrationForm: true,
  }),
  [t.LOG_IN.FAILURE]: (
    state,
    { payload: logInErrors }: StateTypes.IAction<ILogInErrors>
  ) => ({
    ...state,
    isLoading: false,
    logInErrors,
  }),
  [t.LOG_IN.START]: (state) => ({
    ...state,
    logInErrors: undefined,
    isLoading: true,
  }),
  [t.LOG_IN.SUCCESS]: (state, { payload: user }: StateTypes.IAction<IUser>) => ({
    ...state,
    logInErrors: undefined,
    current: user,
    isLoading: false,
    isOpenLogInForm: false,
  }),
  [t.LOG_OUT]: () => ({
    ...initialState,
  }),
  [t.LOG_IN.WITH_LOCALSTORAGE]: (
    state,
    { payload: user }: StateTypes.IAction<IUser>
  ) => ({
    ...state,
    current: user,
  }),
  DEFAULT: (state) => state,
};

const reducer: StateTypes.Reducer<IState, any> = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default reducer;

import type { IUser, ILoginErrs } from 'Entities/user';
import * as StateTypes from 'States/types';
import * as t from './action-types';
import { IState } from './model';

const initialState: IState = {
  user: undefined,
  error: undefined,
  isLogginIn: false,
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
  [t.LOGIN.FAILURE]: (state, { payload: error }: StateTypes.IAction<ILoginErrs>) => ({
    ...state,
    isLogginIn: false,
    error,
  }),
  [t.LOGIN.START]: (state) => ({
    ...state,
    isLogginIn: true,
  }),
  [t.LOGIN.SUCCESS]: (state, { payload: user }: StateTypes.IAction<IUser>) => ({
    ...state,
    isLogginIn: false,
    user,
  }),
  [t.LOGIN.CLEAR_LOGIN_ERRS]: (state) => ({
    ...state,
    error: undefined,
  }),
  [t.LOGIN.LOGOUT]: () => ({
    ...initialState,
  }),
  [t.LOGIN.LOGIN_VIA_LOCALSTORAGE]: (
    state,
    { payload: user }: StateTypes.IAction<IUser>
  ) => ({
    ...state,
    user,
  }),
  DEFAULT: (state) => state,
};

const reducer: StateTypes.Reducer<IState, any> = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export default reducer;

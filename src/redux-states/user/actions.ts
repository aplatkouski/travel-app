import { ILogInErrors, IUser } from 'Entities/user';
import * as StateTypes from 'States/types';
import { LOCALSTORAGE_KEY } from '../../constants';
import * as t from './action-types';

export const closeLogInForm = (): StateTypes.IAction<undefined> => ({
  type: t.LOG_IN_FORM.CLOSE,
  payload: undefined,
});

export const openLogInForm = (): StateTypes.IAction<undefined> => ({
  type: t.LOG_IN_FORM.OPEN,
  payload: undefined,
});

export const closeRegistrationForm = (): StateTypes.IAction<undefined> => ({
  type: t.REGISTRATION_FORM.CLOSE,
  payload: undefined,
});

export const openRegistrationForm = (): StateTypes.IAction<undefined> => ({
  type: t.REGISTRATION_FORM.OPEN,
  payload: undefined,
});

export const logInFailure = (
  logInErrors: ILogInErrors
): StateTypes.IAction<ILogInErrors> => ({
  type: t.LOG_IN.FAILURE,
  payload: logInErrors,
});

export const logInSuccess = (user: IUser): StateTypes.IAction<IUser> => ({
  type: t.LOG_IN.SUCCESS,
  payload: user,
});

export const startLogIn = (): StateTypes.IAction<undefined> => ({
  type: t.LOG_IN.START,
  payload: undefined,
});

export const logOut = (): StateTypes.IAction<undefined> => {
  localStorage.removeItem(LOCALSTORAGE_KEY);
  return {
    type: t.LOG_OUT,
    payload: undefined,
  };
};

export const logInWithLocalStorage = (): StateTypes.IAction<undefined> => ({
  type: t.LOG_IN.WITH_LOCALSTORAGE,
  payload: undefined,
});

import type { Countries } from 'Entities/country';
import { IUser, ILoginErrs } from 'Entities/user';
import * as StateTypes from 'States/types';
import * as t from './action-types';

export const closeAuthorizationForm = (): StateTypes.IAction<undefined> => ({
  type: t.AUTHORIZATION_FORM.CLOSE,
  payload: undefined,
});

export const openAuthorizationForm = (): StateTypes.IAction<undefined> => ({
  type: t.AUTHORIZATION_FORM.OPEN,
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

export const loginFailure = (error: ILoginErrs): StateTypes.IAction<ILoginErrs> => ({
  type: t.LOGIN.FAILURE,
  payload: error,
});

export const loginSuccess = (user: IUser): StateTypes.IAction<IUser> => ({
  type: t.LOGIN.SUCCESS,
  payload: user,
});

export const startLogin = (): StateTypes.IAction<undefined> => ({
  type: t.LOGIN.START,
  payload: undefined,
});

export const clearLoginErrs = (): StateTypes.IAction<undefined> => ({
  type: t.LOGIN.CLEAR_LOGIN_ERRS,
  payload: undefined,
});

export const logout = (): StateTypes.IAction<undefined> => ({
  type: t.LOGIN.LOGOUT,
  payload: undefined,
});

export const loginViaLocalStorage = (): StateTypes.IAction<undefined> => ({
  type: t.LOGIN.LOGIN_VIA_LOCALSTORAGE,
  payload: undefined,
});

import type { Countries } from 'Entities/country';
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

export const logInFailure = (error: Error): StateTypes.IAction<Error> => ({
  type: t.LOGIN.FAILURE,
  payload: error,
});

export const logInSuccess = (countries: Countries): StateTypes.IAction<Countries> => ({
  type: t.LOGIN.SUCCESS,
  payload: countries,
});

export const logInRequest = (): StateTypes.IAction<undefined> => ({
  type: t.LOGIN.START,
  payload: undefined,
});

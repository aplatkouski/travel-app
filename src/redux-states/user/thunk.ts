import { IUser, ILoginErrs } from 'Entities/user';
import * as StateTypes from 'States/types';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { api, loginAPI, LOCALSTORAGE_NAME } from '../../constants';
import {
  loginFailure,
  loginSuccess,
  startLogin,
  clearLoginErrs,
  logout,
} from './actions';
import { IState } from './model';

interface IErrResponse {
  message: string;
  errors: Array<{ param: string; msg: string }>;
}

function isError(value: any | undefined): value is Error {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return value && (value as Error).message !== undefined;
}

export const clearLoginErrorsThunk = (): ThunkAction<any, any, any, Action> => (
  dispatch
) => {
  dispatch(clearLoginErrs());
};

export const logoutThunk = (): ThunkAction<any, any, any, Action> => (dispatch) => {
  dispatch(logout());
  localStorage.removeItem(LOCALSTORAGE_NAME);
};

export const loginViaLocalStorageThunk = (): ThunkAction<any, any, any, Action> => (
  dispatch
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const lsItem: string | null = localStorage.getItem(LOCALSTORAGE_NAME);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const localStorageData: IUser = lsItem ? JSON.parse(lsItem) : {};

  if (localStorageData) {
    const userData: IUser = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      name: localStorageData.name,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      token: localStorageData.token,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      userId: localStorageData.userId,
    };
    dispatch(loginSuccess(userData));
  }
};

export const loginThunk = (
  userLogin: string,
  userPassword: string
): StateTypes.AsyncDispatch<IState, any> => async (dispatch) => {
  dispatch(startLogin());
  try {
    const data = {
      login: userLogin,
      password: userPassword,
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${api}/${loginAPI}`, options);

    if (response.status !== 201) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const body: IErrResponse = await response.json();

      const errObj: ILoginErrs = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        generalErr: body.message,
        loginErr: null,
        passwordErr: null,
      };

      if (body.errors && body.errors.length) {
        for (let i = 0; i < body.errors.length; i += 1) {
          const err = body.errors[i];
          switch (err.param) {
            case 'login':
              errObj.loginErr = err.msg;
              break;
            case 'password':
              errObj.passwordErr = err.msg;
              break;
            default:
              break;
          }
        }
      }
      dispatch(loginFailure(errObj));
    } else {
      const user = (await response.json()) as IUser;

      dispatch(loginSuccess(user));

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const lsItem: string | null = localStorage.getItem(LOCALSTORAGE_NAME);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const localStorageData = lsItem ? JSON.parse(lsItem) : {};

      localStorage.setItem(
        LOCALSTORAGE_NAME,
        JSON.stringify({
          ...localStorageData,
          ...user,
        })
      );
    }
  } catch (error) {
    if (error && isError(error)) {
      const errObj: ILoginErrs = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        generalErr: error.message,
        loginErr: null,
        passwordErr: null,
      };
      dispatch(loginFailure(errObj));
    }
  }
};

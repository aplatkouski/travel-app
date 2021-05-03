import { ICredentials, ILogInErrors, IUser } from 'Entities/user';
import * as StateTypes from 'States/types';
import { api, LOCALSTORAGE_KEY, LOG_IN_API } from '../../constants';
import { logInFailure, logInSuccess, startLogIn } from './actions';
import { IState } from './model';

interface IResponse {
  errors: Array<{ param: keyof ILogInErrors; msg: string }>;
  message: string;
}

export const logInWithLocalStorageThunk = (): StateTypes.SyncDispatch<IState, any> => (
  dispatch
) => {
  const savedUserData = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) || 'null'
  ) as IUser | null;

  if (savedUserData) {
    const { name, token, id } = savedUserData;
    const userData: IUser = {
      name,
      token,
      id,
    };
    dispatch(logInSuccess(userData));
  }
};

export const logInThunk = ({
  login,
  password,
}: ICredentials): StateTypes.AsyncDispatch<IState, any> => async (dispatch) => {
  dispatch(startLogIn());
  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        login,
        password,
      }),
    };
    const response = await fetch(`${api}/${LOG_IN_API}`, options);

    if (response.status !== 201) {
      const body = (await response.json()) as IResponse;

      const errors: ILogInErrors = {
        general: body.message,
        login: null,
        password: null,
      };

      if (body.errors && body.errors.length) {
        // eslint-disable-next-line promise/prefer-await-to-callbacks
        body.errors.forEach((error) => {
          if (Object.keys(errors).includes(error.param)) {
            errors[error.param] = error.msg;
          }
        });
      }
      dispatch(logInFailure(errors));
    } else {
      const user = (await response.json()) as IUser;
      dispatch(logInSuccess(user));
      const lsItem: string | null = localStorage.getItem(LOCALSTORAGE_KEY);
      const savedUserData = lsItem ? (JSON.parse(lsItem) as IUser) : {};

      localStorage.setItem(
        LOCALSTORAGE_KEY,
        JSON.stringify({
          ...savedUserData,
          ...user,
        })
      );
    }
  } catch (e) {
    if (e instanceof Error) {
      const errors: ILogInErrors = {
        general: e.message,
        login: null,
        password: null,
      };
      dispatch(logInFailure(errors));
    }
  }
};

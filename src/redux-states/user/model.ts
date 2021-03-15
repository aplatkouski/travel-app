import { ILogInErrors, IUser } from 'Entities/user';

export interface IState {
  current?: IUser;
  error?: Error;
  isLoading: boolean;
  isOpenLogInForm: boolean;
  isOpenRegistrationForm: boolean;
  logInErrors?: ILogInErrors;
  message?: string;
}

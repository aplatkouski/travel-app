import { IUser } from 'Entities/user';

export interface IState {
  error?: Error;
  isLoading: boolean;
  isOpenAuthorizationForm: boolean;
  isOpenRegistrationForm: boolean;
  message?: string;
  current?: IUser;
}

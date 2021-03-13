import { IUser, ILoginErrs } from 'Entities/user';

export interface IState {
  user?: IUser;
  error?: ILoginErrs;
  isLogginIn: boolean;
  isLoading: boolean;
  isOpenAuthorizationForm: boolean;
  isOpenRegistrationForm: boolean;
  message?: string;
  current?: IUser;
}

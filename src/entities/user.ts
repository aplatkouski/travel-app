import { ID } from 'Entities/travel-app';

export interface IUser {
  name: string;
  token: string;
  id: ID;
}

export interface ICredentials {
  login: string;
  password: string;
}

export interface IUserRegistrationData extends ICredentials {
  name: string;
  photoPath: string;
}

export interface ILogInErrors {
  general: string | null | undefined;
  login: string | null | undefined;
  password: string | null | undefined;
}

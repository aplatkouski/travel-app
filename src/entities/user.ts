export interface IUser {
  name: string;
  token: string;
  photoUrl: string;
}

export interface IUserAuthorizationData {
  login: string;
  password: string;
}

export interface IUserRegistrationData extends IUserAuthorizationData {
  name: string;
  photoPath: string;
}

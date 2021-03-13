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

export interface ILoginErrs {
  loginErr: string | null | undefined;
  passwordErr: string | null | undefined;
  generalErr: string | null | undefined;
}

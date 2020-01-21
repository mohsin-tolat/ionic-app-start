export class AuthenticateModel {
  username: string;
  password: string;
}

export class LoggedInUserModel {
  username: string;
  token: string;
  message: string;
}

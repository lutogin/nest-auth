export interface User {
  readonly email: string;
  readonly password: string;
}
export interface SignupRsp {
  readonly email: string;
}
export interface LoginRsp {
  readonly token: string;
}

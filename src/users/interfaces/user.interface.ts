export interface User {
  readonly email: string;
  readonly password: string;
  readonly role: string;
}
export interface SignupRsp {
  readonly email: string;
  readonly role: string;
}
export interface LoginRsp {
  readonly token: string;
}

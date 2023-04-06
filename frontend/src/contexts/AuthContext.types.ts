export interface IAuthContext {
  register: (params: RegisterParams) => Promise<any>;
  login: (params: LoginParams) => Promise<any>;
  forgotPassword: (params: ForgotParams) => Promise<any>;
  resetPassword: (params: ResetParams) => Promise<any>;
  user: User | null;
  token: string | null;
}

export interface RegisterParams {
  email: string;
  password: string;
  name: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface ForgotParams {
  email: string;
}

export interface ResetParams {
  newPassword: string;
  resetToken: string | string[];
}

import { IUserData } from '.';

export interface IAuth {
  api_token?: string;
  refreshToken?: string;
  user?: IUserData;
  token?: string;
}

export interface IAuthState {
  isLoggedIn: boolean;
  logging: boolean;
  loadingRegister: boolean;
  userData?: IUserData;
  loadingResetPassword: boolean;
}

export interface ILoginPayload {
  username: string;
  password: string;
  onNavigate?: () => void
}

export interface IResetPassPayload {
  username: string;
  password: string;
  newpassword: string;
  onNavigate?: () => void
  onHanldeSuccess?: () => void
}

export interface ILogoutPayload {
  onNavigate?: () => void
}

export interface IRegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms?: boolean;
}

export interface IResponseAuth {
  data: {
    token?: string;
    type: string;
    username?: string;
  };
  status?: string;
  statusText?: string;
  message?: string;
}

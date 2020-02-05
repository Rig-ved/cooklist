import { Action } from "@ngrx/store";
import { AuthActionModels } from "../authAction.model";
import { ReqLoginSignUp } from "../auth.service";
// import { UserModel } from '../user.model'

export const LOGIN_START = "[Auth] LOGIN_START";
export const LOGIN_SUCCESS = "[Auth] LOGIN";
export const LOGIN_FAILED = "[Auth] LOGIN_FAILED";
export const SIGNUP_START = "[Auth] SignUp Start";
export const SIGNUP_SUCCESS = "[Auth] SignUp Success";
export const LOGOUT = "[Auth] LOGOUT";
export const AUTO_LOGIN = "[Auth] Auto Login";
export const AUTO_LOGIN_SUCCESS = "[Auth] Auto Login Success"


export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: AuthActionModels) {}
}

export class AutoLoginSuccessAction implements Action {
  readonly type = AUTO_LOGIN_SUCCESS;
  constructor(public payload: AuthActionModels) {}
}

export class LoginFailedAction implements Action {
  readonly type = LOGIN_FAILED;
  constructor(public payload: string) {}
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;
  constructor() {}
}

export class LoginStartAction implements Action {
  readonly type = LOGIN_START;
  constructor(
    public payload: {
      data: ReqLoginSignUp;
    }
  ) {}
}

export class SignupStartAction implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {}
}
export class AutoLoginAction implements Action {
  readonly type = AUTO_LOGIN;
}

export class SignupSuccessAction implements Action {
    readonly type = SIGNUP_SUCCESS;
    constructor(public payload: string) {}
}

export type AUTH_ACTIONS =
  | LoginSuccessAction
  | LoginStartAction
  | LoginFailedAction
  | LogoutAction
  | SignupStartAction
  | SignupSuccessAction
  | AutoLoginAction
  | AutoLoginSuccessAction;

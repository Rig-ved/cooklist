import { Action } from '@ngrx/store'
import { AuthActionModels } from '../authAction.model'
import { ReqLoginSignUp } from '../auth.service'
// import { UserModel } from '../user.model'

export const LOGIN_START = "[Auth] LOGIN_START"
export const LOGIN="[Auth] LOGIN"
export const LOGIN_FAILED = "[Auth] LOGIN_FAILED"
export const SIGNUP_START = "[Auth] SignUp Start"
export const SIGNUP_SUCCESS = "[Auth] SignUp Success"
export const LOGOUT = "[Auth] LOGOUT"




export class SignUpStart implements Action {
    readonly type = SIGNUP_START
    constructor(public payload: {
        url:string,
        data:ReqLoginSignUp
    }) {}
}

export class SignUpSuccess implements Action {
    readonly type = SIGNUP_SUCCESS
    constructor(public payload:string) {}
}


export class Login implements Action {
    readonly type = LOGIN
    constructor(public payload:AuthActionModels ) {}
}

export class LoginFailed implements Action {
    readonly type = LOGIN_FAILED
    constructor(public payload:string ) {}
}

export class Logout implements Action {
    readonly type = LOGOUT
    constructor() {}
}

export class LoginStart implements Action {
    readonly type = LOGIN_START
    constructor( public payload : {
        url:string,
        data:ReqLoginSignUp
    }) {}
}


export type AUTH_ACTIONS = Login | Logout | LoginStart |LoginFailed | SignUpStart
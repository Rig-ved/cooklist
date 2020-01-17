import { UserModel } from '../user.model';
import * as authActions from './auth.actions'




export interface UserState {
    user:UserModel,
    authError:string,
    loading:boolean
}

export const initialStateAuth:UserState = {
    user:null,
    authError:null,
    loading:false
}

export function AuthReducer (state:UserState = initialStateAuth,action:authActions.AUTH_ACTIONS) {
    switch(action.type) {
        case authActions.LOGIN : {
            const user = new UserModel (
                action.payload.email,
                action.payload.id,
                action.payload.token,
                action.payload.expirationDate
            )
            return  {
                ...state,
                user,
                authError:null,
                loading:false
            }
        }
        case authActions.LOGOUT : {
            debugger
            return  {
                ...state,
                authError:null,
                user:null

            }
            debugger
        }
        case authActions.LOGIN_START : {
            return  {
                ...state,
                authError:null,
                loading:true
            }
        }

        case authActions.LOGIN_FAILED : {
            return  {
                ...state,
                user:null,
                loading:false,
                authError:action.payload
            }
        }

        default : {
            return state
        }
    }
    return state
}
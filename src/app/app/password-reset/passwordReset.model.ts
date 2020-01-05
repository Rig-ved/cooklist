export interface PasswordResponseModel {
    oobCode:string,
    mode:string,
    apiKey:string
}

export interface PasswordResetSuccessModel {
    email:string,
    requestType:string
}
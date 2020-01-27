import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  public post :string
  public enableDebug:boolean
  public showLoader:boolean

  // token
  public apiKey:string
  public resetPassword:string
  public forgotPassword:string
  public signIn:string 
  public signUp:string
  constructor() { }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

/**
 * @author Anirban bhattacharya
 * @email anirban.bhattacharya@prgx.com
 * @create date 2019-12-28 00:02:41
 * @modify date 2019-12-28 00:02:41
 * @desc [description]
 */

export interface AuthResponse {
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string
}

@Injectable({
    providedIn:'root'
}) 
export class AuthService{

    constructor(private http:HttpClient){}

    private authSubject = new Subject<any>();
    
    signup(data) {
      return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDO9avzbc-NuehPt5EoTr8tQFmyzg7qQF8",
        data)
    }
}
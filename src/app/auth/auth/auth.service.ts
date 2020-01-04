/**
 * @author Anirban bhattacharya
 * @email anirban.bhattacharya@prgx.com
 * @create date 2019-12-28 00:02:41
 * @modify date 2019-12-28 00:02:41
 * @desc [description]
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, throwError, BehaviorSubject, from, Observable, of, timer } from 'rxjs';
import { catchError, tap, timeout, delay, scan, takeWhile, takeUntil, map, filter } from 'rxjs/operators';
import { UserModel } from './user.model';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { RecipeService } from 'src/app/shared/recipes.services';
import { BannerService, BannerInterface } from 'src/app/banner/banner.service';
import { Time } from '@angular/common';


export interface AuthResponse {
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}
interface autoLoggedUserModel {
    id:string,
    email:string,
    _token:string,
    _tokenExpirationDate:Date
}
@Injectable({
    providedIn:'root'
}) 

export class AuthService{
    currentUser:UserModel
    expirationTmr:any
    constructor(private http:HttpClient,
        private router:Router,
        private banner:BannerService,
        private ngxIndexedDBService:NgxIndexedDBService
        
    ){
        this.ngxIndexedDBService.currentStore="users"
    }
    // Behaviour subject also gives subscribers immediate access to 
    // the previously emitted value  even if they havent subscribed at the point in that value
    // value was emitted. That means we can get access to the currently active user 
    // even if we only subscribe after that user has been emitted . This means 
    // when we fetch data and we need token at this point of time , even if the user 
    // logged in before we can get access to that 
    authenticatedUser = new BehaviorSubject<UserModel>(null);
    
    logout (){
        this.authenticatedUser.next(null)
        this.router.navigate(['/login']);
        this.ngxIndexedDBService.clear().then((item)=>{
            ()=>{
                console.log("successfully cleared all the items",item)
            }
        })
        if(this.expirationTmr) {
            clearTimeout(this.expirationTmr)
        }
        this.expirationTmr = null
    }
    private autoTimerStarts(expirationTime) {
        console.log(expirationTime);
        timer(0, 1000).pipe(
            scan(acc => --acc, 10),
            takeWhile(x => x >= 0),
            filter((x)=>{
                return x <= 5
            })
            ).subscribe( (item) => {
                const data : BannerInterface = {
                    message:"You will be automatically logged out in " + item + ' secs',
                    messageType:'error'
                }
                this.banner.showBanner(data)
                if(item === 0) {
                    this.logout()
                }
            })
    }
    autoLogout (expirationTime){
        // Show Banner with logout time 
        expirationTime-=10000;
        this.expirationTmr = setTimeout(()=>{
            this.autoTimerStarts(expirationTime)
        },expirationTime)
    }

    autoLogin() {
        // TODO get the data from the indexed DB 
         let autoLoggedInUser:UserModel;  
         this.ngxIndexedDBService.getAll().then((user:autoLoggedUserModel[])=>{
            if(user.length == 0) {
                return ;
            }
            
            let loadedUser=user[0];  
            
            autoLoggedInUser= new UserModel(
                loadedUser.email,
                loadedUser.id,
                loadedUser._token,
                new Date(loadedUser._tokenExpirationDate)
            );
            if(autoLoggedInUser.token) {

                this.authenticatedUser.next(autoLoggedInUser)
                const expirationDuration = new Date(loadedUser._tokenExpirationDate).getTime() - 
                new Date().getTime();
               // this.autoLogout(expirationDuration)
                this.autoLogout(20000)

            } else {
                this.logout()
            }
         })
        

    }

    signupOrLogin(data,mode:boolean) {
      const url =(!mode)?
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDO9avzbc-NuehPt5EoTr8tQFmyzg7qQF8"
      :
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDO9avzbc-NuehPt5EoTr8tQFmyzg7qQF8"  
      return this.http.post<AuthResponse>
        (url,
        data).pipe(
            catchError((error)=>{
                let errorMsg:string = "An unknown error occured"
                if(!error.error && !error.error.error) {
                    return throwError(errorMsg)
                }
                switch (error.error.error.message) {
                    case 'EMAIL_EXISTS':
                       errorMsg="A user with the same email already exists" 
                    case 'EMAIL_NOT_FOUND':
                        errorMsg = "User not found. Please sign up instead"
                    case 'INVALID_PASSWORD': 
                        errorMsg = "Please provide the correct password."       
                }
                return throwError(errorMsg)     
            }),
            tap((resData:AuthResponse)=>{
                this.handleAuthentication(resData,mode);
            })
        )   
    }

    private handleAuthentication(resData,mode) {
        if(mode) {
            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            const user = new UserModel(resData.email,resData.localId,resData.idToken,expirationDate)
            this.saveUserDataToDB(user)
            //this.autoLogout(+resData.expiresIn * 1000)
            this.autoLogout(31000)
            this.authenticatedUser.next(user);
            
        }
    }

    private saveUserDataToDB(user) {
        if(window.indexedDB) {
                this.ngxIndexedDBService.clear().then(
                    () => {
                       // Clear all the items and add the current user 
                       this.ngxIndexedDBService.add(user).then(
                            () => {
                                this.currentUser = user
                            },
                            (err)=>{
                                throw new Error("Unable to save the user to the DB")
                            }

                       )

                    },
                    error => {
                        throw new Error("Unable to clear all the user")
                    }
                );
                    
                
           
               
        }
    }
}
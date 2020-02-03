import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService, autoLoggedUserModel } from './auth.service';
import { map, catchError, take, exhaustMap, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
    providedIn:'root'
})


export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService, 
        private store:Store<AppState>,
        private ngxIndexedDBService:NgxIndexedDBService,
        private router:Router) {}
    canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean  | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | UrlTree {
        let isUserFromDB:Boolean= false
        

        
        return this.store.select('authList').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            switchMap( async(user)=>{
                let userFirst:autoLoggedUserModel[]=[]
                userFirst = await this.ngxIndexedDBService.getAll();
                if(userFirst) {
                    isUserFromDB = true
                    return userFirst
                }
            }),

            map( (user)=>{
                    if(user) {
                        return true
                    } else {
                        return this.router.createUrlTree(['/login'])
                    }
                
                
            }),
            catchError(()=>{
                let errString = "User not authenticated at all"
                return throwError(errString)
            }

            )

        )
        
    }
    
}
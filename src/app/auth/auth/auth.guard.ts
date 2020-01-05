import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { map, catchError, take } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})


export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService, private router:Router) {}
    canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean  | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | UrlTree {
        return this.authService.authenticatedUser.pipe(
            take(1),
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
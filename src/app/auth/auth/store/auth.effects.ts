import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as AuthActions from "./auth.actions";
import { of, Observable, interval } from "rxjs";
import {
  catchError,
  map,
  switchMap,
  mergeMap,
  tap,
  switchMapTo,
  exhaustMap
} from "rxjs/operators";
import { AuthResponse, AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";
import { Action } from "@ngrx/store";
import {
  BannerInterface,
  BannerService
} from "src/app/shared/banner/banner.service";
import { Router, ActivatedRoute } from "@angular/router";

//import all requried services or any dependencies

// actions is one big observable which will give u access to all the dispatched actions
// so that we can react to them, , we just then react differently in the reducer
// Here we dont change the state but then we can execute any other action and dispatch that new
// action

const handleAuthentication = resData => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  return new AuthActions.Login({
    email: resData.email,
    id: resData.localId,
    token: resData.idToken,
    expirationDate: expirationDate
  });
};

const handleError = errorRes => {
  // We have to return a non error observable so that overall stream doesnt stream die
  // Switch map Returns a new observable (from inner observable) to the outer observable
  let errorMessage = "An unknown error occurred!";
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.LoginFailed(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case "EMAIL_EXISTS":
      errorMessage = "A user with the same email already exists";
      break;
    case "EMAIL_NOT_FOUND":
      errorMessage = "User not found. Please sign up instead";
      break;
    case "INVALID_PASSWORD":
      errorMessage = "Please provide the correct password.";
      break;
  }
  return of(new AuthActions.LoginFailed(errorMessage));
};

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private bannerService: BannerService,
    private router: Router,
    private authService:AuthService,
    private route:ActivatedRoute,
    private http: HttpClient
  ) {}

 

  @Effect()
  authLogin: Observable<any> = this.action$.pipe(
    ofType<AuthActions.LoginStart>(AuthActions.LOGIN_START),
    exhaustMap((authData: AuthActions.LoginStart) => {
      authData.payload.data["returnSecureToken"] = true;
      return this.http
        .post<AuthResponse>(authData.payload.url, authData.payload.data)
        .pipe(
          map((resData: AuthResponse) => {
            return handleAuthentication(resData);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  loginSuccess: Observable<any> = this.action$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      const message: string = "Logged in Successfully";
      const data: BannerInterface = {
        message: message,
        messageType: "success"
      };
      this.bannerService.showBanner(data);
      interval(1000).subscribe(() => {
        this.router.navigate(["/"]);
      });
    })
  );
  @Effect({ dispatch: false })
  logOutSuccess: Observable<any> = this.action$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.logout()
    }) 
  );

  @Effect({ dispatch: false })
  SignupSuccess: Observable<any> = this.action$.pipe(
    ofType(AuthActions.SIGNUP_SUCCESS),
    tap((signUpState) => {
      const data: BannerInterface = {
        message: signUpState.payload,
        messageType: "success"
      };
      this.bannerService.showBanner(data);
      
    })
  );

  @Effect()
  authSignUp = this.action$.pipe(
    ofType(AuthActions.SIGNUP_START),
    exhaustMap((authSignUp: AuthActions.SignUpStart) => {
        authSignUp.payload.data["returnSecureToken"] = true;
      return this.http
        .post<AuthResponse>(authSignUp.payload.url, authSignUp.payload.data)
        .pipe(
          map((resData: AuthResponse) => {
            const message="User created successfully.Please login now"  
            return new AuthActions.SignUpSuccess(message);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );
}

import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as AuthActions from "./auth.actions";
import { of, interval } from "rxjs";
import {
  catchError,
  map,
  mergeMap,
  tap,
  exhaustMap,
  flatMap,
  switchMap,
  switchMapTo
} from "rxjs/operators";
import {
  AuthResponse,
  AuthService,
  autoLoggedUserModel
} from "../auth.service";
import { HttpClient } from "@angular/common/http";

import {
  BannerInterface,
  BannerService
} from "src/app/shared/banner/banner.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserModel } from "../user.model";
import { NgxIndexedDBService } from "ngx-indexed-db";

//import all requried services or any dependencies

// actions is one big observable which will give u access to all the dispatched actions
// so that we can react to them, , we just then react differently in the reducer
// Here we dont change the state but then we can execute any other action and dispatch that new
// action

const handleAutoLogin = (resData, loggedInUser) => {
  return new AuthActions.AutoLoginSuccessAction({
    email: resData.email,
    id: resData.id,
    token: resData.token,
    expirationDate: new Date(loggedInUser._tokenExpirationDate)
  });
};

const handleAuthentication = (resData, mode) => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  if (mode) {
    return new AuthActions.LoginSuccessAction({
      email: resData.email,
      id: resData.localId,
      token: resData.idToken,
      expirationDate: expirationDate
    });
  } else {
    return new AuthActions.SignupSuccessAction(",");
  }
};

const handleError = errorRes => {
  // We have to return a non error observable so that overall stream doesnt stream die
  // Switch map Returns a new observable (from inner observable) to the outer observable
  let errorMessage = "An unknown error occurred!";
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.LoginFailedAction(errorMessage));
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
  return of(new AuthActions.LoginFailedAction(errorMessage));
};

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private bannerService: BannerService,
    private router: Router,
    private authService: AuthService,
    private ngxIndexedDBService: NgxIndexedDBService
  ) {
    this.ngxIndexedDBService.currentStore = "users";
  }

  private mode: boolean = false;

  @Effect()
  login = this.action$.pipe(
    ofType<AuthActions.LoginStartAction>(AuthActions.LOGIN_START),
    mergeMap((authData: AuthActions.LoginStartAction) => {
      const data = {
        email: authData.payload.data.email,
        password: authData.payload.data.password,
        returnSecureToken: true
      };
      return this.authService.loginEffects(data).pipe(
        tap(resData => {
          this.authService.autoLogout(+resData.expiresIn * 1000);
          // this.authService.autoLogout(30000);
        }),
        map((resData: AuthResponse) => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const user = new UserModel(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );
          this.authService.saveUserDataToDB(user);
          return handleAuthentication(resData, !this.mode);
        }),
        catchError(errorRes => {
          return handleError(errorRes);
        })
      );
    })
  );

  @Effect()
  signUp = this.action$.pipe(
    ofType<AuthActions.SignupStartAction>(AuthActions.SIGNUP_START),
    mergeMap((authData: AuthActions.SignupStartAction) => {
      const data = {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      };
      return this.authService.signUpEffects(data).pipe(
        tap(resData => {
          this.authService.autoLogout(+resData.expiresIn * 1000);
        }),
        map((resData: AuthResponse) => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const user = new UserModel(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );
          this.authService.saveUserDataToDB(user);
          return handleAuthentication(resData, this.mode);
        }),
        catchError(errorRes => {
          return handleError(errorRes);
        })
      );
    })
  );
  @Effect()
  autoLogin = this.action$.pipe(
    ofType<AuthActions.AutoLoginAction>(AuthActions.AUTO_LOGIN),
    exhaustMap(async () => {
      let userFirst: autoLoggedUserModel[] = [];
      userFirst = await this.ngxIndexedDBService.getAll();
      return userFirst;
    }),
    map(user => {
      let autoLoggedInUser: UserModel;
      let loadedUser;

      if (user.length == 0) {
        return { type: "DUMMY" };
      }
      loadedUser = user[0];

      autoLoggedInUser = new UserModel(
        loadedUser.email,
        loadedUser.id,
        loadedUser._token,
        new Date(loadedUser._tokenExpirationDate)
      );
      if (autoLoggedInUser.token) {
        // Replace with ReloadAction
        const expirationDuration =
          new Date(loadedUser._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.autoLogout(expirationDuration);
        return handleAutoLogin(autoLoggedInUser, loadedUser);
      }

      return { type: "DUMMY" };
    })
  );

  @Effect({ dispatch: false })
  loginSuccess = this.action$.pipe(
    ofType(AuthActions.LOGIN_SUCCESS),
    tap(() => {
      this.router.navigate(["/recipes"]);
    })
  );

  @Effect({ dispatch: false })
  autoLoginSuccess = this.action$.pipe(
    ofType(AuthActions.AUTO_LOGIN_SUCCESS),
    tap(() => {
      this.router.navigate(["/recipes"]);
    })
  );

  @Effect({ dispatch: false })
  signUpSuccess = this.action$.pipe(
    ofType(AuthActions.SIGNUP_SUCCESS),
    tap(() => {
      const message: string = "User created successfully.Login now";
      const data: BannerInterface = {
        message: message,
        messageType: "success"
      };
      this.bannerService.showBanner(data);

      this.router.navigate(["/login"]);
    })
  );
  @Effect({ dispatch: false })
  logOutSuccess = this.action$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearTimer();
      this.authService.logout();
      this.authService.logoutEffect();
    })
  );

  @Effect({ dispatch: false })
  loginFailed = this.action$.pipe(
    ofType(AuthActions.LOGIN_FAILED),
    tap((messageStr: AuthActions.LoginFailedAction) => {
      const message: string = messageStr.payload;
      const data: BannerInterface = {
        message: message,
        messageType: "error"
      };
      this.bannerService.showBanner(data);
      this.router.navigate(["/login"]);
    })
  );
}

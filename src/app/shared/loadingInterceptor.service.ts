import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpParams
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, take, exhaustMap, map } from "rxjs/operators";
import { AuthService } from "../auth/auth/auth.service";
import { UserModel } from "../auth/auth/user.model";
import { SpinnerServcice } from './spinner/spinner.service';
import { Injectable } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn:'root'
})
export class LoadingInterceptorService implements HttpInterceptor {
  private numberOfRequests = 0;
  constructor(
    private authService: AuthService,
    private store:Store<AppState>,
    private spinnerService : SpinnerServcice) {

    }
   //   // take tells RX JS to take only one value from that observable
//   // and thereafter it automatically unsubscribes

//   // exhaust Map waits for the user observable to complete and thereafter 
//   // it gives us the user we get from the previous observable and now we return 
//   // the complete the http call from inside exhaust Map passing in that function  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ):Observable<HttpEvent<any>> {
    this.numberOfRequests++;
    this.spinnerService.showLoader();
    return this.store.select('authList')
      .pipe(
        take(1),
        map((authState)=>{
          return authState.user
        }),
        exhaustMap((user: UserModel) => {
          if(!user) {
            return next.handle(req)
          }
          const modifiedRequest = req.clone({
            params:new HttpParams().append('auth',user.token)
          })
          return next.handle(modifiedRequest);
        }),
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.onEnd();
            }
          },
          (err: any) => {
            this.onEnd();
          }
        )
      )
     
  }
  private onEnd(): void {
    this.numberOfRequests--;
    if (this.numberOfRequests === 0) {
      //this.hideLoader();
      this.spinnerService.hideLoader();
    }
  }
}

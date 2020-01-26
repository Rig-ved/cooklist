import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponse, ReqLoginSignUp } from "./auth.service";
import { Subscription, interval } from "rxjs";
import { BannerInterface, BannerService } from "src/app/shared/banner/banner.service";
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions'

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild("f") signForm: NgForm;
  loginMode: boolean;
  isForgotPassword = false;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private store:Store<AppState>,
    private bannerService: BannerService
  ) {}
  background: string = "";
  private authSubscription: Subscription;
  private redirectSubscription: Subscription;

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      if (data) this.background = data["background"];
    });
   
  }

  valuesClick(item: MouseEvent) {
    this.isForgotPassword = false;
    item.target["id"] === "login"
      ? (this.loginMode = true)
      : (this.loginMode = false);
  }
  signUpOrLogin(form) {
    if (!form.valid) {
      return;
    }

    const email = form.value.username;
    const password = form.value.password;
    const data:ReqLoginSignUp = { email, password};

    if (this.loginMode) {
      this.store.dispatch(new AuthActions.LoginStartAction({data}))
    } else {
     // message = "User created successfully.Login now";
      this.store.dispatch(new AuthActions.SignupStartAction(data))
    }
    this.signForm.resetForm();
  }
  onAuthFormSubmit(form: NgForm,ham:any) {
    if (!this.isForgotPassword) {
      this.signUpOrLogin(form);
    } else {
      this.resetPassword(form);
    }
  }
  resetPassword(form) {
    if (!form.valid) {
      return;
    }
    const email = form.value.username;
    const data = { email, requestType: "PASSWORD_RESET"}
    this.authSubscription = this.authService.forgotPassword(data).subscribe(
      (response: AuthResponse) => {
        if (response) {
          this.signForm.resetForm();
          this.isForgotPassword = false;
          const data: BannerInterface = {
            message: "An email has been sent with a link to reset your password.",
            messageType: "success"
          };
          this.bannerService.showBanner(data);

        }
      },
      errMsg => {
        const data: BannerInterface = {
          message: errMsg,
          messageType: "error"
        };
        this.bannerService.showBanner(data);
      }
    );
    
  }
  cancel() {
    this.signForm.resetForm()
    this.isForgotPassword = false;
  }
  forgotPassword() {
    this.signForm.resetForm()
    this.isForgotPassword = true;
  }
  ngOnDestroy(): void {
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    //this.redirectSubscription.unsubscribe();
  }
}

import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponse } from "./auth.service";
import { Subscription, interval } from "rxjs";
import { BannerInterface, BannerService } from "src/app/banner/banner.service";

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
    let message: string = "";
    if (this.loginMode) {
      message = "Logged in successfully";
    } else {
      message = "User created successfully.Login now";
    }
    const email = form.value.username;
    const password = form.value.password;
    const data = { email, password, returnSecureToken: true };
    this.authSubscription = this.authService
      .signupOrLogin(data, this.loginMode)
      .subscribe(
        (response: AuthResponse) => {
          if (response) {
            const data: BannerInterface = {
              message: message,
              messageType: "success"
            };
            this.bannerService.showBanner(data);
            if (this.loginMode) {
              this.redirectSubscription = interval(1000).subscribe(() => {
                this.router.navigate(["/recipes"], { relativeTo: this.route });
              });
            } else {
              this.router.navigate(["/login"], { relativeTo: this.route });
            }
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
    this.signForm.resetForm();
  }
  onAuthFormSubmit(form: NgForm) {
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
    this.authSubscription.unsubscribe();
    this.redirectSubscription.unsubscribe();
  }
}

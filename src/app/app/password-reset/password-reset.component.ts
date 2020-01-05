import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { AuthService } from "src/app/auth/auth/auth.service";
import {
  PasswordResponseModel,
  PasswordResetSuccessModel
} from "./passwordReset.model";
import { Subscription, interval } from "rxjs";
import { BannerInterface, BannerService } from "src/app/banner/banner.service";
import { take } from "rxjs/operators";

@Component({
  selector: "app-password-reset",
  templateUrl: "./password-reset.component.html",
  styleUrls: ["./password-reset.component.css"]
})
export class PasswordResetComponent implements OnInit, OnDestroy {
  @ViewChild("f") passwordResetForm: NgForm;
  queryParamObj: PasswordResponseModel;
  passwordChangedSubs: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private bannerService: BannerService
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(take(1))
      .subscribe((params: PasswordResponseModel) => {
        this.queryParamObj = params;
      });
  }
  onChangePassword(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const oobCode = this.queryParamObj["oobCode"];
    const newPassword = form.value.password;
    const data = { newPassword, oobCode };
    this.passwordChangedSubs = this.authService.resetPassword(data).subscribe(
      (response: PasswordResetSuccessModel) => {
        if (response) {
          this.passwordResetForm.resetForm();
          const data: BannerInterface = {
            message: `The password has been changed successfully for ${response.email} account`,
            messageType: "success"
          };
          this.bannerService.showBanner(data);
          let subscription :Subscription =interval(4000).subscribe(() => {
            this.router.navigate(["/login"], { relativeTo: this.route }),
            (err)=>{console.log(err)},
            ()=>{
              subscription.unsubscribe()
            }
          });
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

  ngOnDestroy(): void {
    this.passwordChangedSubs.unsubscribe();
  }
}

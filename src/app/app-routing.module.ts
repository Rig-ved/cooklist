import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthComponent } from "./auth/auth/auth.component";

import { PasswordResetComponent } from "./app/password-reset/password-reset.component";

const appRoutes: Routes = [
  {
    path: "login",
    component: AuthComponent,
    data: { background: "/assets/images/background.jpg" }
  },
  { path: "password-reset", component: PasswordResetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

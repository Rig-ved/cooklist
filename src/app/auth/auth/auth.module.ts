import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { PasswordResetComponent } from 'src/app/app/password-reset/password-reset.component';
const appRoutes: Routes = [
    {
      path: "login",
      component: AuthComponent,
      data: { background: "/assets/images/background.jpg" }
    },
    { path: "password-reset", component: PasswordResetComponent }
];
@NgModule({

    declarations:[
        AuthComponent,
        PasswordResetComponent
    ],
    imports :[
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule,
        RouterModule.forChild(appRoutes)
    ]
})
export class AuthModule  {

}
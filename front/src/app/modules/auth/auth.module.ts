import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }

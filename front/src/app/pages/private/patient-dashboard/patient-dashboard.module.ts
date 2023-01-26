import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatComponent } from './pages/chat/chat.component';
import { SpecialistInfoComponent } from './pages/specialist-info/specialist-info.component';


@NgModule({
  declarations: [
    
  
    ProfileComponent,
            ChatComponent,
            SpecialistInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PatientDashboardModule
  ]
})
export class PatientDashboardModule { }

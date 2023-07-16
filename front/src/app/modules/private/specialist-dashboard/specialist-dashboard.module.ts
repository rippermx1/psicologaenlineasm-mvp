import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialistDashboardRoutingModule } from './specialist-dashboard-routing.module';
import { MeetsComponent } from './meets/meets.component';
import { PatientsComponent } from './patients/patients.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MeetsComponent,
    PatientsComponent,
    ScheduleComponent,
    ProfileComponent,
    SettingsComponent,
  ],
  imports: [CommonModule, SpecialistDashboardRoutingModule, SharedModule],
})
export class SpecialistDashboardModule {}

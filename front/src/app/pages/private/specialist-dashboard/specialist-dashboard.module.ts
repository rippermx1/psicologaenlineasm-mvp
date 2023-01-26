import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialistDashboardRoutingModule } from './specialist-dashboard-routing.module';
import { SpecialistDashboardComponent } from './specialist-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { MeetsComponent } from './pages/meets/meets.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { DteComponent } from './pages/dte/dte.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';


@NgModule({
  declarations: [
    SpecialistDashboardComponent,
    ScheduleComponent,
    MeetsComponent,
    PatientsComponent,
    DteComponent,
    ProfileComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SpecialistDashboardRoutingModule
  ]
})
export class SpecialistDashboardModule { }

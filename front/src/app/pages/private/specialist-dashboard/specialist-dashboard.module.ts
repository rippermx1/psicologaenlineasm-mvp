import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialistDashboardRoutingModule } from './specialist-dashboard-routing.module';
import { SpecialistDashboardComponent } from './specialist-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { MeetsComponent } from './pages/meets/meets.component';
import { PacientsComponent } from './pages/pacients/pacients.component';
import { DteComponent } from './pages/dte/dte.component';


@NgModule({
  declarations: [
    SpecialistDashboardComponent,
    ScheduleComponent,
    MeetsComponent,
    PacientsComponent,
    DteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SpecialistDashboardRoutingModule
  ]
})
export class SpecialistDashboardModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetsComponent } from './meets/meets.component';
import { PatientsComponent } from './patients/patients.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SpecialistDashboardComponent } from './specialist-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SpecialistDashboardComponent,
    children: [
      {
        path: 'meets',
        component: MeetsComponent,
      },
      {
        path: 'patients',
        component: PatientsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialistDashboardRoutingModule {}

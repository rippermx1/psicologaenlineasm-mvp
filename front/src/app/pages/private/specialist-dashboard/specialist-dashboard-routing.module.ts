import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetsComponent } from './pages/meets/meets.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { SpecialistDashboardComponent } from './specialist-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SpecialistDashboardComponent,
    children: [
      {
        path: 'schedule',
        component: ScheduleComponent,
        outlet: 'specialist',
      },
      {
        path: 'meets',
        component: MeetsComponent,
        outlet: 'specialist',
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialistDashboardRoutingModule {}

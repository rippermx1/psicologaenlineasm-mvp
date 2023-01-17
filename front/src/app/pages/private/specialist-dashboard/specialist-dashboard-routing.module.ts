import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialistDashboardComponent } from './specialist-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SpecialistDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialistDashboardRoutingModule {}

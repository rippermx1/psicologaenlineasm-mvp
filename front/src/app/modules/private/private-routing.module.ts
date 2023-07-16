import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialistDashboardComponent } from './specialist-dashboard/specialist-dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';

const routes: Routes = [
  {
    path: 'patient',
    loadChildren: () => import('./patient-dashboard/patient-dashboard.module').then(m => m.PatientDashboardModule),
  },
  {
    path: 'specialist',
    loadChildren: () => import('./specialist-dashboard/specialist-dashboard.module').then(m => m.SpecialistDashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}

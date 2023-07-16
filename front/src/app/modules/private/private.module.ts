import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { SpecialistDashboardComponent } from './specialist-dashboard/specialist-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PatientDashboardComponent, SpecialistDashboardComponent],
  imports: [CommonModule, PrivateRoutingModule, SharedModule],
})
export class PrivateModule {}

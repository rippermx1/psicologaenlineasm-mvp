import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientDashboardRoutingModule } from './patient-dashboard-routing.module';
import { PrivateModule } from '../private.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PatientDashboardRoutingModule,
    PrivateModule
  ]
})
export class PatientDashboardModule { }

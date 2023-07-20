import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ScheduleMeetRoutingModule } from './schedule-meet-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ScheduleMeetRoutingModule,
    SharedModule
  ]
})
export class ScheduleMeetModule { }

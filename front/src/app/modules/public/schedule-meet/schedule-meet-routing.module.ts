import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleMeetComponent } from './schedule-meet.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleMeetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleMeetRoutingModule { }

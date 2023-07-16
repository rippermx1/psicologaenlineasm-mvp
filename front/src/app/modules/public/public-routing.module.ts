import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleMeetComponent } from './schedule/schedule-meet.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleMeetComponent
  },
  {
    path: 'payment-confirm',
    component: PaymentConfirmComponent
  },
  {
    path: '',
    component: ScheduleMeetComponent
  },
  {
    path: '',
    component: ScheduleMeetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

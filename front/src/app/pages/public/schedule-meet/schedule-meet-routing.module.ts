import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentConfirmComponent } from './pages/payment-confirm/payment-confirm.component';
import { PaymentErrorComponent } from './pages/payment-error/payment-error.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { ScheduleMeetComponent } from './schedule-meet.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleMeetComponent
  },
  {
    path:'payment/confirm',
    component: PaymentConfirmComponent,
  },
  {
    path:'payment/error',
    component: PaymentErrorComponent
  },
  {
    path:'payment/success',
    component: PaymentSuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleMeetRoutingModule { }

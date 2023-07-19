import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';
import { PaymentErrorComponent } from './payment-error/payment-error.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'schedule',
    pathMatch: 'full'
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule-meet/schedule-meet.module').then(m => m.ScheduleMeetModule)
  },
  {
    path: 'payment/confirm',
    loadChildren: () => import('./payment-confirm/payment-confirm.module').then(m => m.PaymentConfirmModule)
  },
  {
    path: 'payment/error',
    loadChildren: () => import('./payment-error/payment-error.module').then(m => m.PaymentErrorModule)
  },
  {
    path: 'payment/success',
    loadChildren: () => import('./payment-success/payment-success.module').then(m => m.PaymentSuccessModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

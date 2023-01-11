import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScheduleMeetRoutingModule } from './schedule-meet-routing.module';
import { PaymentErrorComponent } from './pages/payment-error/payment-error.component';
import { PaymentConfirmComponent } from './pages/payment-confirm/payment-confirm.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { ScheduleMeetComponent } from './pages/schedule-meet/schedule-meet.component';



@NgModule({
  declarations: [
    ScheduleMeetComponent,
    PaymentConfirmComponent,
    PaymentErrorComponent,
    PaymentSuccessComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ScheduleMeetRoutingModule
  ]
})
export class ScheduleMeetModule { }

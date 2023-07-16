import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScheduleMeetComponent } from './schedule/schedule-meet.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';
import { PaymentErrorComponent } from './payment-error/payment-error.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';


@NgModule({
  declarations: [
    ScheduleMeetComponent,
    PaymentConfirmComponent,
    PaymentErrorComponent,
    PaymentSuccessComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
  ]
})
export class PublicModule { }

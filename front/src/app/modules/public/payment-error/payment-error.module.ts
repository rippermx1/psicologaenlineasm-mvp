import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentErrorRoutingModule } from './payment-error-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaymentErrorRoutingModule,
    SharedModule
  ]
})
export class PaymentErrorModule { }

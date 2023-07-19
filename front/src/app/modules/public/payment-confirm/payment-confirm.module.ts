import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentConfirmRoutingModule } from './payment-confirm-routing.module';
import { PublicModule } from '../public.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaymentConfirmRoutingModule,
    PublicModule
  ]
})
export class PaymentConfirmModule { }

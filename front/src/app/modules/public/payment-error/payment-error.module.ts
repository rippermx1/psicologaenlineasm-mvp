import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentErrorRoutingModule } from './payment-error-routing.module';
import { PublicModule } from '../public.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaymentErrorRoutingModule,
    PublicModule
  ]
})
export class PaymentErrorModule { }

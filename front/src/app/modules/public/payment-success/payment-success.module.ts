import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentSuccessRoutingModule } from './payment-success-routing.module';
import { PublicModule } from '../public.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaymentSuccessRoutingModule,
    PublicModule
  ]
})
export class PaymentSuccessModule { }

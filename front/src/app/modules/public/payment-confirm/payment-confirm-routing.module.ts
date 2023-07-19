import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentConfirmComponent } from './payment-confirm.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentConfirmComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentConfirmRoutingModule { }

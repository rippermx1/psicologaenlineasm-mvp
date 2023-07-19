import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentErrorComponent } from './payment-error.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentErrorRoutingModule { }

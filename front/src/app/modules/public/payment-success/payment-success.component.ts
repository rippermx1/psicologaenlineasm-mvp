import { Component, OnInit } from '@angular/core';
import { PaymentDetails } from '../schedule-meet/interfaces/payment-detail.interface';
import { PaymentSuccessService } from './services/paymemt-success.service';
import { Subscription } from 'rxjs';
import { Patient } from './interfaces/patient.interface';
import { Observable } from 'rxjs';
import { PaymentResponse } from './interfaces/payment-response';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.sass'],
})
export class PaymentSuccessComponent implements OnInit {
  patient$: Observable<Patient> = new Observable();
  payment$: Observable<PaymentResponse> = new Observable();
  paymentDetails: PaymentDetails = {};

  constructor(private readonly service: PaymentSuccessService) {}

  ngOnInit(): void {
    this.paymentDetails.amount = 100;
    this.paymentDetails.date = new Date();
    this.paymentDetails.paymentMethod = 'Credit Card';

    const userId = sessionStorage.getItem('user_id') ?? '';
    const trxId = sessionStorage.getItem('trx_id') ?? '';

    this.patient$ = this.service.getPatient(userId);
    this.patient$.subscribe((patient) => {
      sessionStorage.setItem('patient', JSON.stringify(patient));
    });

    this.payment$ = this.service.getPayment(trxId, userId);
    this.service.getPayment(trxId, userId).subscribe((response) => {
      console.log(response);
    });
  }
}

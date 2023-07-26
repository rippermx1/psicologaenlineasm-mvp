import { Component, OnInit } from '@angular/core';
import { PaymentDetails } from '../schedule-meet/interfaces/payment-detail.interface';
import { PaymentSuccessService } from './services/paymemt-success.service';
import { Subscription } from 'rxjs';
import { Patient } from './interfaces/patient.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.sass'],
})
export class PaymentSuccessComponent implements OnInit {
  patient$: Observable<Patient> = new Observable();

  paymentDetails: PaymentDetails = {};
  userProfileUrl: string = '/user-profile';
  constructor(private readonly service: PaymentSuccessService) {}

  ngOnInit(): void {
    this.paymentDetails.amount = 100;
    this.paymentDetails.date = new Date();
    this.paymentDetails.paymentMethod = 'Credit Card';

    this.patient$ = this.service.getPatient(sessionStorage.getItem('user_id')??'');

  }
}

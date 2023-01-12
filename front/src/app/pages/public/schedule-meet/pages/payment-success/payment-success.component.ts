import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaymentDetails } from '../../interfaces/payment-detail.interface';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.sass']
})
export class PaymentSuccessComponent implements OnInit {
  paymentDetails: PaymentDetails = {}
  userProfileUrl: string = "/user-profile";
  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {

    this.paymentDetails.amount = 100;
    this.paymentDetails.date = new Date();
    this.paymentDetails.paymentMethod = 'Credit Card';
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PacientPaymentRequest } from './interfaces/pacient.interface';
import { ScheduleMeetService } from './service/schedule-meet.service';
import { DEFAULT_USER_ID } from './constants/schedule-meet.constants';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-schedule-meet',
  templateUrl: './schedule-meet.component.html',
  styleUrls: ['./schedule-meet.component.sass'],
})
export class ScheduleMeetComponent implements OnInit {
  firstForm: FormGroup = new FormGroup({});
  secondForm: FormGroup = new FormGroup({});
  thirdForm: FormGroup = new FormGroup({});
  selectedDate: Date = new Date();
  pacientPayment: PacientPaymentRequest = {};
  availableHours$: Observable<string[]> = of([
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
  ]);
  defaultUserId = DEFAULT_USER_ID;

  constructor(private service: ScheduleMeetService) {}

  ngOnInit(): void {
    this.firstForm = this.service.firstForm;
    this.secondForm = this.service.secondForm;
    this.thirdForm = this.service.thirdForm;

    // this.availableHours$ = this._service.getAvailableHours(this.selectedDate);
  }

  selectDate(date: Date) {
    console.log(date);
    this.selectedDate = date;
    this.availableHours$ = this.service.getAvailableHours(
      this.defaultUserId,
      this.selectedDate
    );
  }

  onSubmit() {}

  getErrorMessage() {
    if (this.thirdForm.controls['termsControl'].hasError('required')) {
      return 'You must accept the terms and conditions';
    }
    return;
  }

  createPayment() {
    this.pacientPayment = this.firstForm.getRawValue() as PacientPaymentRequest;
    console.log(this.pacientPayment);
    this.selectedDate = new Date();
    this.service.createPayment(this.pacientPayment).subscribe((data) => {
      window.location.href = data.payment_url;
    });
  }
}

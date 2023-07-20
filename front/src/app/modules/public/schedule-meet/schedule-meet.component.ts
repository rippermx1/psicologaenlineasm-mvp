import { Component, OnInit } from '@angular/core';
import { PacientPaymentRequest } from './interfaces/pacient.interface';
import { ScheduleMeetService } from './service/schedule-meet.service';
import { DEFAULT_USER_ID } from './constants/schedule-meet.constants';
import { FormGroup } from '@angular/forms';
import { AvailableHours } from './interfaces/available-hours.interface';

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
  availableHours: AvailableHours[] = [];
  selectedHour: String = new String();
  isSelectedHour: boolean = false;
  defaultUserId = DEFAULT_USER_ID;
  isLoading: boolean = false;

  constructor(private service: ScheduleMeetService) {}

  ngOnInit(): void {
    this.firstForm = this.service.firstForm;
    this.secondForm = this.service.secondForm;
    this.thirdForm = this.service.thirdForm;

    this.getAvailableHours();
  }

  getAvailableHours() {
    this.isLoading = true;
    this.availableHours = [];
    this.service
      .getAvailableHours(this.defaultUserId, this.selectedDate)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.availableHours = data?.hours;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }

  selectDate(date: Date) {
    console.log(date);
    this.isSelectedHour = false;
    this.selectedDate = date;
    this.getAvailableHours();
  }

  selectHour(hour: AvailableHours, event: any) {
    this.selectedHour = hour.value;
    this.isSelectedHour = event.selected;
    console.log(hour, event);
  }

  onSubmit() {}

  getErrorMessage() {
    if (this.thirdForm.controls['termsControl'].hasError('required')) {
      return 'You must accept the terms and conditions';
    }
    return;
  }

  createPayment() {
    this.pacientPayment = {
      ...this.firstForm.getRawValue(),
      meetDate: this.selectedDate,
      meetTime: this.selectedHour,
      userId: this.defaultUserId,
    };
    console.log(this.pacientPayment);
    
    this.service.createPayment(this.pacientPayment).subscribe((data) => {
      window.location.href = data.payment_url;
    });
  }
}

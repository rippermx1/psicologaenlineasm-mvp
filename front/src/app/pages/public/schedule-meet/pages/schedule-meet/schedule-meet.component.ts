import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { PacientPaymentRequest } from '../../interfaces/pacient.interface';
import { ScheduleMeetService } from '../../service/schedule-meet.service';


@Component({
  selector: 'app-schedule-meet',
  templateUrl: './schedule-meet.component.html',
  styleUrls: ['./schedule-meet.component.sass']
})
export class ScheduleMeetComponent implements OnInit {
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  thirdFormGroup: FormGroup = new FormGroup({});
  selectedDate: Date = new Date();
  pacientPayment: PacientPaymentRequest = {};
  availableHours$: Observable<string[]> = of(['09:00 AM', '10:00 AM', '11:00 AM']);

  constructor(
    private formBuilder: FormBuilder,
    private _service: ScheduleMeetService) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      rut: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
    });

    this.thirdFormGroup = this.formBuilder.group({
      termsControl: [true, [Validators.requiredTrue]]
    });

    // this.availableHours$ = this._service.getAvailableHours(this.selectedDate);
  }

  selectDate(date: Date) {
    console.log(date);
    this.selectedDate = date;
    this.availableHours$ = this._service.getAvailableHours(this.selectedDate);
  }

  onSubmit() {

  }

  getErrorMessage() {
    if (this.thirdFormGroup.controls['termsControl'].hasError('required')) {
      return 'You must accept the terms and conditions';
    }
    return;
  }

  createPayment() {
    this.pacientPayment = this.firstFormGroup.getRawValue() as PacientPaymentRequest;
    console.log(this.pacientPayment);
    this.selectedDate = new Date();
    this._service.createPayment(this.pacientPayment).subscribe(
      data => {
        window.location.href = data.payment_url
      },
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Pacient, PacientPaymentRequest } from './interfaces/pacient.interface';
import { ScheduleMeetService } from './service/schedule-meet.service';

@Component({
  selector: 'app-schedule-meet',
  templateUrl: './schedule-meet.component.html',
  styleUrls: ['./schedule-meet.component.sass']
})
export class ScheduleMeetComponent implements OnInit {
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  thirdFormGroup: FormGroup = new FormGroup({});
  selected: Date = new Date();
  pacientPayment: PacientPaymentRequest = {};

  constructor(
    private formBuilder: FormBuilder,
    private _service: ScheduleMeetService) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
    });

    this.thirdFormGroup = this.formBuilder.group({
      termsControl: [false, [Validators.requiredTrue]],
      rut: ['', Validators.required]
    });
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
    this.selected = new Date();
    this._service.createPayment(this.pacientPayment).subscribe(
      data => {
        window.location.href = data.payment_url
      },
    );
  }

}

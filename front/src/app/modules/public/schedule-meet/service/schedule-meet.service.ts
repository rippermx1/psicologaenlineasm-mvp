import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { payment, specialist } from '../endpoints/schedule-meet.endpoints';
import { environment } from 'src/environments/environment';
import { PacientPaymentRequest } from '../interfaces/pacient.interface';
import { PaymentUrlResponse } from '../interfaces/payment-url-response.interface';
import { PaymentResponse } from '../interfaces/payment-response.interface';
import { Observable, repeat, skipWhile, take, map } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RutValidator } from 'src/app/shared/validators/rut.validator';

@Injectable({
  providedIn: 'root',
})
export class ScheduleMeetService {
  constructor(private http: HttpClient) {}

  public get firstForm(): FormGroup {
    return new FormGroup({
      rut: new FormControl(null, [
        Validators.required,
        Validators.maxLength(12),
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(60),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(60),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(60),
      ]),
      cellphone: new FormControl(null, [
        Validators.required,
        Validators.maxLength(12),
      ]),
      age: new FormControl(null, [
        Validators.required,
        Validators.maxLength(2),
      ]),
    });
  }

  public get secondForm(): FormGroup {
    return new FormGroup({});
  }

  public get thirdForm(): FormGroup {
    return new FormGroup({
      termsControl: new FormControl(null, [Validators.requiredTrue]),
    });
  }

  createPayment(
    pacient: PacientPaymentRequest
  ): Observable<PaymentUrlResponse> {
    const endpoint = `${environment.api_url}${payment.create}`;
    return this.http.post<PaymentUrlResponse>(endpoint, pacient).pipe(
      map((response: PaymentUrlResponse) => {
        return response;
      })
    );
  }

  getPayment(trxId: string): Observable<PaymentResponse> {
    const endpoint = `${environment.api_url}${payment.status}`;
    return this.http.post<PaymentResponse>(endpoint, { trx_id: trxId }).pipe(
      repeat({ delay: 1000 }),
      skipWhile((response) => response.status !== 'done'),
      take(1)
    );
  }

  getAvailableHours(userId: string, date: Date): Observable<string[]> {
    const endpoint = `${environment.api_url}${specialist.availableHours}`;
    return this.http.post<string[]>(endpoint, { userId, date });
  }
}
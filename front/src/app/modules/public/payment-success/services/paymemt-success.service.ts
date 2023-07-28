import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  PAYMENT_DB,
  PAYMENT_USER,
} from '../endpoints/payment-success.endpoints';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Patient } from '../interfaces/patient.interface';
import { PaymentResponse } from '../interfaces/payment-response';

@Injectable({
  providedIn: 'root',
})
export class PaymentSuccessService {
  constructor(private http: HttpClient) {}

  getPatient(user_id: string): Observable<Patient> {
    const endpoint = `${environment.api_url}${PAYMENT_USER}?user_id=${user_id}`;
    return this.http.get<Patient>(endpoint);
  }

  getPatientFromSession(): Observable<Patient> {
    return of(JSON.parse(sessionStorage.getItem('patient') ?? ''));
  }

  getPayment(trx_id: string, user_id: string): Observable<PaymentResponse> {
    const endpoint = `${environment.api_url}${PAYMENT_DB}`;
    return this.http.post<PaymentResponse>(endpoint, { trx_id, user_id });
  }
}

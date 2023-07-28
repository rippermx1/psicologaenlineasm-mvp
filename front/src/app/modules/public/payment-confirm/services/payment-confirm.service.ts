import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  GET_PATIENT,
  PAYMENT_TRX,
} from '../endpoints/payment-confirm.endpoints';
import { Observable } from 'rxjs';
import { PaymentResponse } from '../interfaces/payment-response.interface';
import { Patient } from '../interfaces/patient-response';
import { repeat, skipWhile, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaymentConfirmService {
  constructor(private http: HttpClient) {}

  getPayment(trx_id: string, user_id: string): Observable<PaymentResponse> {
    const endpoint = `${environment.api_url}${PAYMENT_TRX}`;
    return this.http.post<PaymentResponse>(endpoint, { trx_id, user_id }).pipe(
      repeat({ delay: 1000 }),
      skipWhile((response) => response.status !== 'done'),
      take(1)
    );
  }

  getPatient(user_id: string): Observable<Patient> {
    const endpoint = `${environment.api_url}${GET_PATIENT}?=${user_id}`;
    return this.http.get<any>(endpoint);
  }
}

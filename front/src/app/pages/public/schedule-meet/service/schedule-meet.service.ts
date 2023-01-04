import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { payment } from '../endpoints/schedule-meet.endpoints';
import { environment } from 'src/environments/environment';
import { PacientPaymentRequest } from '../interfaces/pacient.interface';
import { PaymentUrlResponse } from '../interfaces/payment-url-response.interface';
import { PaymentResponse } from '../interfaces/payment-response.interface';
import { Observable, repeat, skipWhile, take, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ScheduleMeetService {

  constructor(
    private http: HttpClient
  ) { }

  createPayment(pacient: PacientPaymentRequest): Observable<PaymentUrlResponse> {
    const endpoint = `${environment.api_url}${payment.create}`;
    return this.http.post<PaymentUrlResponse>(endpoint, pacient).pipe(
      map((response: PaymentUrlResponse) => {
        return response;
      }));
  }

  getPayment(trx_id: string): Observable<PaymentResponse> {
    const endpoint = `${environment.api_url}${payment.status}`;
    return this.http.post<PaymentResponse>(endpoint, {trx_id})
    .pipe(
      repeat({ delay: 1000 }),
      skipWhile((response) => response.status !== 'done'),
      take(1),
    );
  }
}

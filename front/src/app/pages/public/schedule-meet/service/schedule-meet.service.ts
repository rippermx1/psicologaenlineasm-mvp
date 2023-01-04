import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { payment } from '../endpoints/schedule-meet.endpoints';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { PacientPaymentRequest } from '../interfaces/pacient.interface';
import { PaymentUrlResponse } from '../interfaces/payment-url-response.interface';


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
}

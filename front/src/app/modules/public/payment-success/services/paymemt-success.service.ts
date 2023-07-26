import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PAYMENT_USER } from '../endpoints/payment-success.endpoints';
import { Observable } from 'rxjs';
import { Patient } from '../interfaces/patient.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentSuccessService {
  constructor(private http: HttpClient) {}

  getPatient(user_id: string): Observable<Patient> {
    const endpoint = `${environment.api_url}${PAYMENT_USER}?user_id=${user_id}`;
    console.log('getPatient', endpoint);
    return this.http.get<Patient>(endpoint);
  }
}

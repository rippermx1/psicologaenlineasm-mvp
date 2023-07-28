import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentConfirmService } from './services/payment-confirm.service';
import { Observable } from 'rxjs';
import { Patient } from './interfaces/patient-response';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.sass'],
})
export class PaymentConfirmComponent implements OnInit {
  pending: boolean = true;
  trxId: string = '';
  userId: string = '';
  patient$: Observable<Patient> = new Observable();

  constructor(
    private service: PaymentConfirmService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.trxId = this.getQueryParam('trx_id') ?? '';
    this.userId = this.getQueryParam('user_id') ?? '';

    sessionStorage.setItem('trx_id', this.trxId);
    sessionStorage.setItem('user_id', this.userId);

    this.patient$ = this.service.getPatient(this.userId);
    
    this.service.getPayment(this.trxId, this.userId).subscribe((response) => {
      console.log(response);
      if (response.status == 'done') {
        this.pending = false;
        this.router.navigate(['public/payment/success']);
      }
    });
  }

  getQueryParam(paramName: string): string | null {
    return this.route.snapshot.queryParamMap.get(paramName);
  }
}

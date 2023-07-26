import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleMeetService } from '../schedule-meet/service/schedule-meet.service';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.sass'],
})
export class PaymentConfirmComponent implements OnInit {
  // $getPayment: Observable = new Observable();
  pending: boolean = true;
  constructor(
    private service: ScheduleMeetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const trx_id = this.getQueryParam('trx_id');
    const user_id = this.getQueryParam('user_id');
    sessionStorage.setItem('trx_id', trx_id??'');
    sessionStorage.setItem('user_id', user_id??'');
    
    this.service.getPayment(trx_id??'', user_id??'').subscribe((response) => {
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

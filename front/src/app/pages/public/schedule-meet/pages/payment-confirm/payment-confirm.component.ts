import { Component, OnInit } from '@angular/core';
import { ScheduleMeetService } from '../../service/schedule-meet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.sass']
})
export class PaymentConfirmComponent implements OnInit {
  // $getPayment: Observable = new Observable();
  pending: boolean = false;
  constructor(
    private _service: ScheduleMeetService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const trx_id = this.getQueryParam('trx_id');
    this._service.getPayment(trx_id ?? '')
    .subscribe((response) => {
      console.log(response);
      if (response.status == 'done') {
        this.router.navigate(['/']);
      } else {
        this.pending = true;
      }
    });
  }

  getQueryParam(paramName: string): string | null {
    return this.route.snapshot.queryParamMap.get(paramName);
  }

}

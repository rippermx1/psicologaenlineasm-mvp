import { Component, OnInit } from '@angular/core';
import { ScheduleMeetService } from '../../service/schedule-meet.service';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.sass']
})
export class PaymentConfirmComponent implements OnInit {

  constructor(
    private _service: ScheduleMeetService
  ) { }

  ngOnInit(): void {
    
  }

}

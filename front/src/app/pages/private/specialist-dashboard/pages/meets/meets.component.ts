import { Component, OnInit } from '@angular/core';
import { DaysOfWeek } from '../../interfaces/meet.interface';
import { MeetsService } from '../../service/meets.service';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-meets',
  templateUrl: './meets.component.html',
  styleUrls: ['./meets.component.scss']
})
export class MeetsComponent implements OnInit {
  title: string = 'Citas';
  daysOfWeek$: Observable<DaysOfWeek[]> = new Observable<DaysOfWeek[]>;
  fecthingMeetData: boolean = false;

  constructor(
    private service: MeetsService
  ) { }

  ngOnInit(): void {
    this.daysOfWeek$ = this.service.getDaysOfWeek();
    
  }

  loadSchedule() {}
  
  selectDay(day: DaysOfWeek) {
    console.log(day);
    this.fecthingMeetData = true;
  }

}

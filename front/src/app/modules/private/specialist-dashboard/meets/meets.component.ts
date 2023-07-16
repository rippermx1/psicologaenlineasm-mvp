import { Component, OnInit } from '@angular/core';
import { DaysOfWeek, Meet } from './interfaces/meet.interface';
import { MeetsService } from './services/meets.service';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-meets',
  templateUrl: './meets.component.html',
  styleUrls: ['./meets.component.scss']
})
export class MeetsComponent implements OnInit {
  title: string = 'Citas';
  daysOfWeek$: Observable<DaysOfWeek[]> = new Observable<DaysOfWeek[]>;
  meets: Meet[] = [];
  fecthingMeetData: boolean = false;
  currentDate: string = new Date().toISOString().split('T')[0];
  specialistUuid: string = "7ea60899-e908-49b3-b4e4-ef775f4dfd22";

  constructor(
    private service: MeetsService
  ) { }

  ngOnInit(): void {
    this.currentDate = this.service.getDate();
    this.daysOfWeek$ = this.service.getDaysOfWeek();
    this.getSpecialistMeets(this.specialistUuid, this.currentDate);
  }

  loadSchedule() {}

  getSpecialistMeets(uuid: string, date: string) {
    this.fecthingMeetData = true;
    this.service.getSpecialistMeets(uuid, date).subscribe(meets => {
      console.log(meets);
      this.fecthingMeetData = false;
      this.meets = meets;
    });
  }
  
  selectDay(day: DaysOfWeek) {
    // console.log(day);
    this.getSpecialistMeets(this.specialistUuid, day.date.toISOString().slice(0, 10));
  }

}

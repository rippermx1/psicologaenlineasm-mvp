import { Component, OnInit } from '@angular/core';
import { AVAILABLE, BUSSY, SCHEDULED } from '../../constants/schedule.contants';
import { ScheduleService } from '../../service/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  title: string = 'Agenda';
  currentDate: string = '';
  schedule: Schedule[] = [
    {
      date: new Date(),
      day: 'Lunes',
      hours: []
    },
    {
      date: new Date(),
      day: 'Martes',
      hours: []
    },
    {
      date: new Date(),
      day: 'Miércoles',
      hours: []
    },
    {
      date: new Date(),
      day: 'Jueves',
      hours: []
    },
    {
      date: new Date(),
      day: 'Viernes',
      hours: []
    },
    {
      date: new Date(),
      day: 'Sabado',
      hours: []
    },
  ];

  available: string = AVAILABLE;
  bussy: string = BUSSY;
  scheduled: string = SCHEDULED;

  constructor(
    private service: ScheduleService
  ) {}

  ngOnInit(): void {
    this.currentDate = this.service.getDate();

    this.service.getSpecialistSchedule("25d62323-ed9b-4287-87b9-7a592523110f", this.currentDate).subscribe(
      (response) => {
        console.log(response);
      }
    )
  }

  showDetail(hour: Hour) {
    
  }
}

export interface Schedule {
  date: Date;
  day: string;
  hours: Hour[];
}
export interface Hour {
  time: string;
  value: string;
  selected: boolean;
  status: string;
  active: true;
}

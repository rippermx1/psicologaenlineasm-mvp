import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  title: string = 'Agenda';
  availableHours: ChipHours[] = [
    { time: '09:00', value: '09:00 AM', selected: false },
    { time: '10:00', value: '10:00 AM', selected: false },
    { time: '11:00', value: '11:00 AM', selected: false },
    { time: '12:00', value: '12:00 PM', selected: false },
    { time: '13:00', value: '13:00 AM', selected: false },
    { time: '14:00', value: '14:00 AM', selected: false },
    { time: '15:00', value: '15:00 AM', selected: false },
    { time: '16:00', value: '16:00 AM', selected: false },
    { time: '17:00', value: '17:00 AM', selected: false },
    { time: '18:00', value: '18:00 AM', selected: false },
  ];
  constructor() {}

  ngOnInit(): void {}
}

export interface ChipHours {
  time: string;
  value: string;
  selected: boolean;
}

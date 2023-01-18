import { Component, OnInit } from '@angular/core';
import { AVAILABLE, BUSSY, SCHEDULED } from '../../constants/schedule.contants';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  title: string = 'Agenda';
  schedule: Schedule[] = [
    {
      date: new Date(),
      label: 'Hoy',
      day: 'Miercoles',
      hours: [
        {
          time: '09:00',
          value: '09:00 AM',
          selected: false,
          status: AVAILABLE,
          active: true,
        },
        {
          time: '10:00',
          value: '10:00 AM',
          selected: false,
          status: SCHEDULED,
          active: true,
        },
        {
          time: '11:00',
          value: '11:00 AM',
          selected: false,
          status: AVAILABLE,
          active: true,
        },
        {
          time: '12:00',
          value: '12:00 PM',
          selected: false,
          status: BUSSY,
          active: true,
        },
        {
          time: '13:00',
          value: '13:00 AM',
          selected: false,
          status: BUSSY,
          active: true,
        },
        {
          time: '14:00',
          value: '14:00 AM',
          selected: false,
          status: AVAILABLE,
          active: true,
        },
        {
          time: '15:00',
          value: '15:00 AM',
          selected: false,
          status: SCHEDULED,
          active: true,
        },
        {
          time: '16:00',
          value: '16:00 AM',
          selected: false,
          status: SCHEDULED,
          active: true,
        },
        {
          time: '17:00',
          value: '17:00 AM',
          selected: false,
          status: BUSSY,
          active: true,
        },
        {
          time: '18:00',
          value: '18:00 AM',
          selected: false,
          status: BUSSY,
          active: true,
        },
      ],
    },
    {
      date: new Date(),
      label: 'Mañana',
      day: 'Jueves',
      hours: [
        {
          time: '09:00',
          value: '09:00 AM',
          selected: false,
          status: AVAILABLE,
          active: true,
        },
        {
          time: '10:00',
          value: '10:00 AM',
          selected: false,
          status: SCHEDULED,
          active: true,
        },
        {
          time: '11:00',
          value: '11:00 AM',
          selected: false,
          status: AVAILABLE,
          active: true,
        },
        {
          time: '12:00',
          value: '12:00 PM',
          selected: false,
          status: BUSSY,
          active: true,
        },
        {
          time: '13:00',
          value: '13:00 AM',
          selected: false,
          status: BUSSY,
          active: true,
        },
        {
          time: '14:00',
          value: '14:00 AM',
          selected: false,
          status: AVAILABLE,
          active: true,
        },
        {
          time: '15:00',
          value: '15:00 AM',
          selected: false,
          status: SCHEDULED,
          active: true,
        },
        {
          time: '16:00',
          value: '16:00 AM',
          selected: false,
          status: SCHEDULED,
          active: true,
        },
        {
          time: '17:00',
          value: '17:00 AM',
          selected: false,
          status: BUSSY,
          active: true,
        },
        {
          time: '18:00',
          value: '18:00 AM',
          selected: false,
          status: BUSSY,
          active: true,
        },
      ],
    },
  ];

  available: string = AVAILABLE;
  bussy: string = BUSSY;
  scheduled: string = SCHEDULED;

  constructor() {}

  ngOnInit(): void {}

  showDetail(hour: Hour) {
    
  }
}

export interface Schedule {
  date: Date;
  label: string;
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

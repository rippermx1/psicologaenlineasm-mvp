import { Component, OnInit } from '@angular/core';
import { AVAILABLE, BUSSY, SCHEDULED } from '../../constants/schedule.contants';
import { Block } from '../../interfaces/schedule-response.interface';
import { Schedule } from '../../interfaces/schedule.interface';
import { ScheduleService } from '../../service/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  title: string = 'Agenda';
  currentDate: string = '';
  currentDayOfWeekName: string = '';
  schedule: Schedule[] = [];
  
  available: string = AVAILABLE;
  bussy: string = BUSSY;
  scheduled: string = SCHEDULED;

  constructor(
    private service: ScheduleService
  ) {}

  ngOnInit(): void {
    this.currentDate = this.service.getDate();
    // this.currentDayOfWeekName = this.service.getDayOfWeekName(new Date().getDay());
    this.schedule = this.service.getSchedule();
    console.log(this.schedule)

    this.service.getSpecialistSchedule("25d62323-ed9b-4287-87b9-7a592523110f", this.currentDate).subscribe(
      (response) => {
        this.schedule.forEach((s, index) => {
          console.log(s.date.toISOString().slice(0, 10))
          response.schedule.forEach((x) => {
            if (s.date.toISOString().slice(0, 10) == x.date) s.blocks = x.blocks;
          })
          s.expand = (s.date >= new Date()) ?  true : false;
          s.specialist_uuid = response.schedule[0].specialist_uuid; // TODO: Need to be set in session
          console.log(s)
        });
      }
    )
  }

  showDetail(block: Block) {
    
  }

  createBlock(schedule: Schedule) {
    this.service.setSpecilistScheduleBlocks(schedule.specialist_uuid!, schedule.date.toISOString().slice(0, 10)).subscribe(
      (response) => {
        console.log(response.schedule);
        this.service.getSpecialistSchedule(schedule.specialist_uuid!, this.currentDate).subscribe(
          (response) => {
            this.schedule.forEach((s, index) => {
              console.log(s.date.toISOString().slice(0, 10))
              response.schedule.forEach((x) => {
                if (s.date.toISOString().slice(0, 10) == x.date) s.blocks = x.blocks;
              })
              s.expand = (s.date >= new Date()) ?  true : false;
              s.specialist_uuid = response.schedule[0].specialist_uuid; // TODO: Need to be set in session
              console.log(s)
            });
          }
        )
      }
    )
  }
}

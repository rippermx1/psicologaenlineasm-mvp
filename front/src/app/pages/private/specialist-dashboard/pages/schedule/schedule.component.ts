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
    this.schedule = this.service.getSchedule();
    
    this.getSpecialistSchedule("7ea60899-e908-49b3-b4e4-ef775f4dfd22", this.currentDate);
  }

  getSpecialistSchedule(uuid: string, date: string) {
    this.service.getSpecialistSchedule(uuid, date).subscribe(
      (response) => {
        this.schedule.forEach((s, index) => {
          response.schedule.forEach((x) => { 
            if (s.date.toISOString().slice(0, 10) == x.date) {
              s.blocks = [x.block_0, x.block_1, x.block_2, x.block_3, x.block_4, x.block_5, x.block_6, x.block_7, x.block_8, x.block_9, x.block_10, x.block_11]; 
              s.uuid = x.uuid;
            }
          });
          s.expand = (s.date >= new Date()) ?  true : false;
          s.specialist_uuid = response.schedule[0].specialist_uuid; // TODO: Need to be set in session
        });
      }
    )
  }

  updateBlock(schedule: Schedule, block: Block, event: any) {
    console.log(schedule, block, event.checked)
    let status = (event.checked) ? this.available : this.bussy;
    this.service.updateSpecialistScheduleBlock(schedule.uuid!, block.id!, status).subscribe(
      (response) => {
        this.getSpecialistSchedule(response.schedule[0].specialist_uuid, this.currentDate);
      });
  }

  showDetail(block: Block) {
    
  }

  createBlock(schedule: Schedule) {
    this.service.setSpecilistScheduleBlocks(schedule.specialist_uuid!, schedule.date.toISOString().slice(0, 10)).subscribe(
      (response) => {
        this.getSpecialistSchedule(response.schedule[0].specialist_uuid, this.currentDate);
      }
    )
  }
}

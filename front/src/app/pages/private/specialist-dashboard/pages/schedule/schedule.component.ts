import { Component, OnInit } from '@angular/core';
import { AVAILABLE, BUSSY, SCHEDULED } from '../../constants/schedule.contants';
import { Block, ScheduleResponse } from '../../interfaces/schedule-response.interface';
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
  specialistUuid: string = "7ea60899-e908-49b3-b4e4-ef775f4dfd22";
  fetchingSchedule: boolean = false;
  updatingSchedule: boolean[] = [];

  constructor(
    private service: ScheduleService
  ) {}

  ngOnInit(): void {
    this.currentDate = this.service.getDate();
    this.schedule = this.service.getSchedule();
    this.updatingSchedule = new Array(this.schedule.length).fill(false);
  }

  getSpecialistSchedule(uuid: string, date: string) {
    this.fetchingSchedule = true;
    this.service.getSpecialistSchedule(uuid, date).subscribe(
      (response) => {
        if (!response.schedule) return;
        
        this.refreshScheduleUI(response);
        this.fetchingSchedule = false;
      }
    )
  }

  updateBlock(schedule: Schedule, block: Block, index: number, event: any) {
    this.updatingSchedule[index] = true;
    let status = (event.checked) ? this.available : this.bussy;
    this.service.updateSpecialistScheduleBlock(schedule.uuid!, block.id!, status).subscribe(
      (response) => {
        this.updatingSchedule[index] = false;
        this.refreshScheduleUI(response);
      });
  }

  refreshScheduleUI(response: ScheduleResponse) {
    this.schedule.forEach((s) => {
      if (s.date.toISOString().slice(0, 10) == response.schedule.date) {
        s.blocks = [response.schedule.block_0, response.schedule.block_1, response.schedule.block_2, response.schedule.block_3, response.schedule.block_4, response.schedule.block_5, response.schedule.block_6, response.schedule.block_7, response.schedule.block_8, response.schedule.block_9, response.schedule.block_10, response.schedule.block_11]; 
        s.uuid = response.schedule.uuid;
      }
      s.expand = (s.date >= new Date()) ?  true : false;
      s.specialist_uuid = response.schedule.specialist_uuid; // TODO: Need to be set in session
    });
  }

  loadSchedule(schedule: Schedule) {
    this.getSpecialistSchedule(this.specialistUuid, schedule.date.toISOString().slice(0, 10));
  }

  showDetail(block: Block) {
    
  }

  createBlock(schedule: Schedule) {
    this.service.setSpecilistScheduleBlocks(this.specialistUuid, schedule.date.toISOString().slice(0, 10)).subscribe(
      (response) => {
        this.refreshScheduleUI(response);
      }
    )
  }
}

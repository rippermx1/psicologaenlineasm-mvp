import { Component, OnInit } from '@angular/core';
import { AVAILABLE, BUSSY, SCHEDULED } from '../../constants/schedule.contants';
import { Block, Schedule, ScheduleModel } from '../../interfaces/schedule.interface';
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

  async getSpecialistSchedule(uuid: string, date: string) {
    this.fetchingSchedule = true;
    this.service.getSpecialistSchedule(uuid, date).subscribe(doc => {
      console.log(doc)
      if (doc == undefined) this.fetchingSchedule = false;
      else {
        this.refreshScheduleUI(doc);
        this.fetchingSchedule = false;
      }
    });
  }

  async updateBlock(schedule: Schedule, block: Block, index: number, event: any) {
    this.updatingSchedule[index] = true;
    let status = (event.checked) ? this.available : this.bussy;
    const update$ = await this.service.updateSpecialistScheduleBlock(schedule.uuid!, block.id!, status);
    update$.subscribe(doc => {

      console.log(doc)
      this.refreshScheduleUI(doc);
      this.updatingSchedule[index] = false;
    })
  }

  refreshScheduleUI(schedule: ScheduleModel) {
    this.schedule.forEach((s) => {
      if (s.date.toISOString().slice(0, 10) == schedule.date) {
        s.blocks = [schedule.block_0, schedule.block_1, schedule.block_2, schedule.block_3, schedule.block_4, schedule.block_5, schedule.block_6, schedule.block_7, schedule.block_8, schedule.block_9, schedule.block_10, schedule.block_11]; 
        s.uuid = schedule.uuid;
      }
      s.expand = (s.date >= new Date()) ?  true : false;
      s.specialist_uuid = schedule.specialist_uuid; // TODO: Need to be set in session
    });
  }

  loadSchedule(schedule: Schedule) {
    this.getSpecialistSchedule(this.specialistUuid, schedule.date.toISOString().slice(0, 10));
  }

  showDetail(block: Block) {
    
  }

  async createBlock(schedule: Schedule) {
    console.log(schedule)
    const create$ = await this.service.setSpecilistScheduleBlocks(this.specialistUuid, schedule.date.toISOString().slice(0, 10));
    create$.subscribe(doc => {
      console.log(doc)
      this.refreshScheduleUI(doc);
    });
  }
}

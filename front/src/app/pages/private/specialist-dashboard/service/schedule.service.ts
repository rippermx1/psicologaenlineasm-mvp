import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CREATE_SPECIALIST_SCHEDULE_BLOCKS, SPECIALIST_SCHEDULE, UPDATE_SPECIALIST_SCHEDULE_BLOCKS } from '../endpoints/schedule.endpoint';
import { ScheduleResponse } from '../interfaces/schedule-response.interface';
import { Schedule } from '../interfaces/schedule.interface';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private daysOfWeek: string[] = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
  private currentDate: Date = new Date();

  constructor(private http: HttpClient) {}

  getSpecialistSchedule( uuid: string, date: string ): Observable<ScheduleResponse> {
    return this.http.get<ScheduleResponse>(`${environment.api_url}${SPECIALIST_SCHEDULE}?uuid=${uuid}&date=${date}`);
  }

  setSpecilistScheduleBlocks(uuid: string, date: string): Observable<ScheduleResponse> {
    console.log({ uuid , date })   
    return this.http.post<ScheduleResponse>(`${environment.api_url}${CREATE_SPECIALIST_SCHEDULE_BLOCKS}`, { uuid , date });
  }

  updateSpecialistScheduleBlock(schedule_uuid: string, block_id: number, status: string): Observable<ScheduleResponse> {
    return this.http.post<ScheduleResponse>(`${environment.api_url}${UPDATE_SPECIALIST_SCHEDULE_BLOCKS}`, { schedule_uuid, block_id, status });
  }

  getDayOfWeekName(index: number): string {
    return this.daysOfWeek.at(index)!;
  }

  getDate(): string {
    return new Date().toISOString().slice(0, 10);
  }

  getWeekDates(): Date[] {
    let weekDates: Date[] = [];
    let dayOfWeek = this.currentDate.getUTCDay(); //0-6 , 0 is sunday
    this.currentDate.setDate(this.currentDate.getDate() - dayOfWeek); // start of the week
    for (let i = 0; i < 7; i++) {
      weekDates.push(new Date(this.currentDate));
      this.currentDate.setDate(this.currentDate.getDate() + 1);
    }
    return weekDates;
  }

  getSchedule() {
    let schedule: Schedule[] = [];
    this.getWeekDates().forEach((date, index) => {
      if (index == 0) return;
      schedule.push({
        date: date,
        day: this.getDayOfWeekName(date.getDay()),
        blocks: [],
      });
    });
    return schedule;
  }
}

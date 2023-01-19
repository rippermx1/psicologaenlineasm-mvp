import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SheduleResponse } from '../interfaces/schedule-response.interface';
import { environment } from 'src/environments/environment';
import { SPECIALIST_SCHEDULE } from '../endpoints/schedule.endpoint';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private http: HttpClient,
  ) { }

  getSpecialistSchedule(uuid: string, date: string): Observable<SheduleResponse> {
    return this.http.get<SheduleResponse>(`${environment.api_url}${SPECIALIST_SCHEDULE}?uuid=${uuid}&date=${date}`);
  }

  getDayOfWeekName(index: number): string {
    return ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].at(index)!;
  }

  getDate(): string {
    return new Date().toISOString().slice(0, 10);
  }
}

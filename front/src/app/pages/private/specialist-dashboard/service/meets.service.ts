import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DaysOfWeek } from '../interfaces/meet.interface';
import { from, filter, map, toArray, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeetsService {
  constructor(private sharedService: SharedService) {}

  getDaysOfWeek(): Observable<DaysOfWeek[]> {
    return from(this.sharedService.daysOfWeek).pipe(
      map(date => {
        return {
          date,
          day: this.sharedService.getDayOfWeekName(date.getDay()),
          selected: date.getDay() == new Date().getDay()
        } as DaysOfWeek;
      }),
      filter((_, index) => index > 0),
      toArray()
    );
  }
}

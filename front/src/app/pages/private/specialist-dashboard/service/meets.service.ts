import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DaysOfWeek, Meet } from '../interfaces/meet.interface';
import { from, filter, map, toArray, Observable } from 'rxjs';
import { query, where } from 'firebase/firestore';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MeetsService {
  meetsRef;
  constructor(
    private sharedService: SharedService,
    private fs: Firestore
  ) {
    this.meetsRef = collection(this.fs, 'meets')
  }

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

  getSpecialistMeets(specialist_uuid: string, date: string) {
    console.log('getSpecialistMeets', specialist_uuid, date)
    return collectionData(query(this.meetsRef, where("specialist_uuid", "==", specialist_uuid), where("date", "==", date)))
    .pipe(map(doc => doc as Meet[]))
  }

  getDate(): string { return this.sharedService.dateStr }
}

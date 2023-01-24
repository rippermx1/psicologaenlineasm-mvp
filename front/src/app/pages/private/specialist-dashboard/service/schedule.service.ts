import { Injectable } from '@angular/core';
import { Schedule, ScheduleModel } from '../interfaces/schedule.interface';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { collection, where, query, updateDoc, doc } from 'firebase/firestore';
import { filter, first, map, defaultIfEmpty } from 'rxjs/operators';

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
  schedulesRef;

  constructor(
    private fs: Firestore
  ) {
    this.schedulesRef = collection(this.fs, 'schedules')
  }

  getSpecialistSchedule( specialist_uuid: string, date: string ) {
    return collectionData(query(this.schedulesRef, where("specialist_uuid", "==", specialist_uuid), where("date", "==", date)))
    .pipe(
      // filter(documents => documents.length > 0),
      map(documents => documents[0] as ScheduleModel),
      first()
    )
  }

  setSpecilistScheduleBlocks(uuid: string, date: string){
    console.log({ uuid , date })   
    // return this.http.post<ScheduleResponse>(`${environment.api_url}${CREATE_SPECIALIST_SCHEDULE_BLOCKS}`, { uuid , date });
  }

  async updateSpecialistScheduleBlock(schedule_uuid: string, block_id: number, status: string){
    const docToUpdate = doc(this.fs, `schedules/${schedule_uuid}`)
    await updateDoc(docToUpdate, { [`block_${block_id}.status`]: status })
    return docData(docToUpdate)
    .pipe(
      map(document => document as ScheduleModel)
    );
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

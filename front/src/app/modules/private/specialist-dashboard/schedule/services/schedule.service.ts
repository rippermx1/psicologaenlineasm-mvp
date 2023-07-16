import { Injectable } from '@angular/core';
import { Schedule, ScheduleModel } from '../interfaces/schedule.interface';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { collection, where, query, updateDoc, doc, setDoc } from 'firebase/firestore';
import { filter, first, map, defaultIfEmpty } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { BLOCK_0, BLOCK_1, BLOCK_10, BLOCK_11, BLOCK_2, BLOCK_3, BLOCK_4, BLOCK_5, BLOCK_6, BLOCK_7, BLOCK_8, BLOCK_9 } from '../constants/schedule.contants';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  schedulesRef;

  constructor(
    private fs: Firestore,
    private sharedService: SharedService
  ) {
    this.schedulesRef = collection(this.fs, 'schedules')
  }

  getSpecialistSchedule( specialist_uuid: string, date: string ) {
    return collectionData(query(this.schedulesRef, where("specialist_uuid", "==", specialist_uuid), where("date", "==", date)))
    .pipe(
      map(documents => documents[0] as ScheduleModel),
      first()
    )
  }

  async setSpecilistScheduleBlocks(specialist_uuid: string, date: string){
    const id = uuidv4();
    
    await setDoc(doc(this.schedulesRef, `${id}`), {
        "uuid": id,
        "specialist_uuid": specialist_uuid,
        "date": date,
        "block_0": BLOCK_0,
        "block_1": BLOCK_1,
        "block_2": BLOCK_2,
        "block_3": BLOCK_3,
        "block_4": BLOCK_4,
        "block_5": BLOCK_5,
        "block_6": BLOCK_6,
        "block_7": BLOCK_7,
        "block_8": BLOCK_8,
        "block_9": BLOCK_9,
        "block_10": BLOCK_10,
        "block_11": BLOCK_11
    });
    return docData(doc(this.fs, `schedules/${id}`)).pipe(
      map(document => document as ScheduleModel)
    );
  }

  async updateSpecialistScheduleBlock(schedule_uuid: string, block_id: number, status: string){
    const docToUpdate = doc(this.fs, `schedules/${schedule_uuid}`)
    await updateDoc(docToUpdate, { [`block_${block_id}.status`]: status })
    return docData(docToUpdate).pipe(
      map(document => document as ScheduleModel)
    );
  }

  getSchedule() {
    let schedule: Schedule[] = [];
    this.sharedService.daysOfWeek.forEach((date, index) => {
      if (index == 0) return;
      schedule.push({
        date: date,
        day: this.sharedService.getDayOfWeekName(date.getDay()),
        blocks: [],
      });
    });
    return schedule;
  }

  getDate(): string { return this.sharedService.dateStr }
}

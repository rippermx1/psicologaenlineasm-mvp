import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  private _daysOfWeekStr: string[] = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
  get daysOfWeekStr() : string[] { return this._daysOfWeekStr }


  private _daysOfWeek(): Date[] {
    let weekDates: Date[] = [];
    let currentDate = new Date();
    let dayOfWeek = currentDate.getUTCDay(); //0-6 , 0 is sunday
    currentDate.setDate(currentDate.getDate() - dayOfWeek); // start of the week
    for (let i = 0; i < 7; i++) {
      weekDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekDates;
  }
  get daysOfWeek(): Date[] { return this._daysOfWeek(); }


  private _getDate(): string {
    return new Date().toISOString().slice(0, 10);
  }
  get dateStr(): string { return this._getDate(); }


  getDayOfWeekName(index: number): string {
    return this.daysOfWeekStr.at(index)!;
  }
}

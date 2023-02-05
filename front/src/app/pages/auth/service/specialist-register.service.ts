import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialistRegisterService {

  constructor() { }

  register(data: any): Observable<any> {
    console.log(data);
    return new Observable();
  }
}

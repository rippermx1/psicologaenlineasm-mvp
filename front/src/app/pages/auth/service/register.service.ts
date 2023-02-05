import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  registerUser(user: any): Observable<any> {
    return new Observable((observer) => {
      observer.next(user);
      observer.complete();
    });
  }
}

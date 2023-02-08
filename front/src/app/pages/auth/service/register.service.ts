import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private auth: Auth
  ) { }

  registerUser(user: any): Observable<any> {
    return new Observable();
  }
}

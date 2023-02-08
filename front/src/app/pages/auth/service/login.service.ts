import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection } from '@angular/fire/firestore';

import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private patientsRef;
  private specialistsRef;	
  constructor(
    private auth: Auth,
    private fs: Firestore
  ) {
    this.patientsRef = collection(this.fs, 'patients');
    this.specialistsRef = collection(this.fs, 'specialists');
  }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  logout() {
    return from(this.auth.signOut());
  }


}

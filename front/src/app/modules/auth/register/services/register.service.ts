import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  addDoc,
  setDoc,
  collection,
  Firestore,
  DocumentReference,
} from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserForm } from '../interfaces/user-form.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private auth: Auth, private db: Firestore) {}

  createUser(user: UserForm): Promise<DocumentReference> {
    return addDoc(collection(this.db, 'users'), user);
  }

  registerUser(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  get form(): FormGroup {
    return new FormGroup({
      rut: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cellphone: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      verified: new FormControl(false, []),
      avatarUrl: new FormControl('', []),
      userType: new FormControl('', []),
      createdAt: new FormControl('', []),
      updatedAt: new FormControl('', []),
    });
  }
}

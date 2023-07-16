import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
  get form() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      userType: new FormControl('', [Validators.required]),
    });
  }
}

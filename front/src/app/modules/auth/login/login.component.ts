import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { LoginService } from './services/login.service';
import { USER_TYPES } from './constants/login.contants';
import { Session } from '../../../session/adapter.session';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  userTypes = USER_TYPES;
  hide = true;
  isLoading = false;
  session: Session = Session.instance;

  constructor(
    private service: LoginService, 
    private router: Router,
    private authService: AuthService
    ) {
    this.form = this.service.form;
  }

  ngOnInit(): void {}

  onSubmit() {
    const { email, password } = this.form.value;
    this.isLoading = true;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.session.user = response.user;
        console.log(this.session.user);
        this.isLoading = false;
        if (this.userTypeControl.value === this.userTypes[0].id)
          this.router.navigate(['/private/patient']);
        else this.router.navigate(['/private/specialist']);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  public get userTypeControl(): AbstractControl {
    return this.form.controls['userType'];
  }

  public get emailControl(): AbstractControl {
    return this.form.controls['email'];
  }

  getEmailErrorMessage() {
    if (this.emailControl.hasError('required')) return 'You must enter a value';
    return this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }

  public get passwordControl(): AbstractControl {
    return this.form.controls['password'];
  }

  getPasswordErrorMessage() {
    if (this.passwordControl.hasError('required'))
      return 'You must enter a value';
    return this.passwordControl.hasError('minLength')
      ? 'Not a valid password'
      : '';
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../register/services/register.service';
import { Router } from '@angular/router';
import { Session } from 'src/app/session/adapter.session';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  session: Session = Session.instance;
  isLoading = false;

  constructor(
    private service: RegisterService,
    private router: Router
  ) { 
    this.form = this.service.form;
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.isLoading = true;
    console.log(this.form.value);
    const { email, password } = this.form.value;
    await this.service.createUser(this.form.value);
    let resp = await this.service.registerUser(email, password);
    console.log(resp);
    this.session.user = resp.user;
    this.isLoading = false;
    this.router.navigate(['/private/specialist']);
  }

}

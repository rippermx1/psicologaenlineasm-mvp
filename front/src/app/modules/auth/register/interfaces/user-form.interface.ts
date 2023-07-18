import { FormControl } from '@angular/forms';

export interface UserForm {
  rut: FormControl<string>;
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  email: FormControl<string>;
  cellphone: FormControl<string>;
  password: FormControl<string>;
  passwordConfirm: FormControl<string>;
  verified: FormControl<boolean>;
  createdAt: FormControl<Date>;
  updatedAt: FormControl<Date>;
  avatarUrl: FormControl<string>;
  userType: FormControl<string>;
}

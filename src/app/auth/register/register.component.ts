import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirm: new FormControl(''),
      },
      this.confirmPassword(),
    );
  }

  submitForm(): void {
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  private confirmPassword(): ValidatorFn {
    return (form: FormGroup) => {
      const result = form.get('password').value === form.get('confirm').value;
      return result ? null : { mismatch: 'Введенные пароли не совпадают' };
    };
  }
}

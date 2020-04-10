import { Login } from './../login-dto';
import { AuthService } from './../auth.service';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private readonly authSrv: AuthService, private readonly router: Router) {}

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
      this.authSrv.register(this.form.value).subscribe(user => this.router.navigateByUrl('/login'));
    }
  }

  private confirmPassword(): ValidatorFn {
    return (form: FormGroup) => {
      const result = form.get('password').value === form.get('confirm').value;
      return result ? null : { mismatch: 'Введенные пароли не совпадают' };
    };
  }
}

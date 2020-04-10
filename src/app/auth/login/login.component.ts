import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private readonly authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('test@email.com', [Validators.required, Validators.email]),
      password: new FormControl('test', [Validators.required]),
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      this.authSrv.login(this.form.value).subscribe(result => {
        this.router.navigateByUrl('work');
      });
    }
  }
}

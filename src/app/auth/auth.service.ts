import { ReportService } from './../services/report.service';
import { User } from './../models/user';
import { environment } from './../../environments/environment';
import { Login } from './login-dto';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient, private reportSrv: ReportService) {}

  get isAuth(): Observable<boolean> {
    return this.authStatus;
  }

  login(login: Login): Observable<User | null> {
    return this.http
      .post<User>(environment.authUrl, { username: login.email, ...login })
      .pipe(
        tap(result => console.log(JSON.stringify(result))),
        catchError((error: HttpErrorResponse) => {
          this.authErrorsHandler(error.status);
          return of(null);
        }),
      );
  }
  authErrorsHandler(status: number): void {
    switch (status) {
      case 401:
        this.reportSrv.reportMessage(`Не правильное имя пользователя или пароль`);
        break;
    }
  }
}

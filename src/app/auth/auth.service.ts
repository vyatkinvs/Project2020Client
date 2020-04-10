import { ReportService } from './../services/report.service';
import { User } from './../models/user';
import { environment } from './../../environments/environment';
import { Login } from './login-dto';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient, private reportSrv: ReportService, private readonly router: Router) {}

  get isAuth(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  login(login: Login): Observable<User | null> {
    return this.http
      .post<User>(environment.authUrl + 'login', { username: login.email, ...login })
      .pipe(
        tap(result => {
          this.authStatus.next(true);
        }),
        catchError((error: HttpErrorResponse) => {
          this.authErrorsHandler(error.status);
          return of(null);
        }),
      );
  }

  register(login: Login): Observable<User | null> {
    return this.http.post<User>(environment.authUrl + 'register', login).pipe(
      tap(result => this.reportSrv.reportMessage('Зарегистрирован новый пользователь')),
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
      case 400:
        this.reportSrv.reportMessage(`Ошибка при создании пользователя`);
        break;
    }
  }
  logout(): void {
    this.router.navigateByUrl('login');
    this.authStatus.next(false);
  }
}

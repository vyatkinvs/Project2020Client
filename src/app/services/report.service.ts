import { environment } from './../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly message: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  reportMessage(msg: string): void {
    this.message.next(msg);
    setTimeout(() => this.message.next(''), environment.clearMessages);
  }
  getMessage(): Observable<string> {
    return this.message.asObservable();
  }
}

import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly message: BehaviorSubject<string> = new BehaviorSubject<string>('Test message');

  constructor() {}

  reportMessage(msg: string): void {
    this.message.next(msg);
  }
  getMessage(): Observable<string> {
    return this.message.asObservable();
  }
}

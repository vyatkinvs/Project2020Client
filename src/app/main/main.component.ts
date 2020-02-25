import { ReportService } from './../services/report.service';
import { Component, OnInit } from '@angular/core';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  loginIcon = faSignInAlt;

  messages: Observable<string>;

  constructor(private readonly reportSrv: ReportService) {}

  ngOnInit(): void {
    this.messages = this.reportSrv.getMessage();
  }
}

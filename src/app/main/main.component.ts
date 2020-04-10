import { AuthService } from './../auth/auth.service';
import { ReportService } from './../services/report.service';
import { Component, OnInit } from '@angular/core';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  loginIcon = faSignInAlt;
  logoutIcon = faSignOutAlt;

  messages: Observable<string>;
  isAuth: Observable<boolean>;

  constructor(private readonly reportSrv: ReportService, private readonly authSrv: AuthService) {}

  ngOnInit(): void {
    this.messages = this.reportSrv.getMessage();
    this.isAuth = this.authSrv.isAuth;
  }
  logout() {
    this.authSrv.logout();
  }
}

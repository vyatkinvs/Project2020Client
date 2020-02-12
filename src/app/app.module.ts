import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WorkComponent } from './work/work.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, MainComponent, PageNotFoundComponent, WorkComponent],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

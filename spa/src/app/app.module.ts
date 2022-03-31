import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {ApiInterceptor} from "./api.interceptor";
import {InboxComponent} from './inbox/inbox.component';
import {EmailViewComponent} from './email-view/email-view.component';
import {EmailComposeComponent} from './email-compose/email-compose.component';
import {CommonModule} from '@angular/common';
import {NoSanitizePipe} from "./email-view/no-sanitize.pipe";

@NgModule({
  declarations: [
    AppComponent,
    InboxComponent,
    EmailViewComponent,
    EmailComposeComponent,
    NoSanitizePipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './auth/pages/login/login.component';
import {SignupComponent} from './auth/pages/signup/signup.component';
import {RouterModule} from "@angular/router";
import {CoreModule} from "./core/core.module";
import {ApiInterceptor} from "./core/interceptors/api.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BoardsPageComponent} from "./boards/pages/boards-page/boards-page.component";
import {BoardsModule} from "./boards/boards.module";
import {AuthModule} from "./auth/auth.module";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BoardsModule,
    AuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

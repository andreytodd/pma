import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "./services/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import { AuthRoutingModule } from './auth-routing.module';
import { UserPageComponent } from './pages/user-page/user-page.component'



@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService]
})
export class AuthModule { }

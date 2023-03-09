import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = this.formBuilder.group({
    login: '',
    password: ''
  })
  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
  }

  signIn(): void {
    const {login, password} = this.loginForm.value
    this.authService.signIn(
      login,
      password)
      .subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      )
  }



}

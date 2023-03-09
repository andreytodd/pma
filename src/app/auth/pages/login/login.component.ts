import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";

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
  loggedIn = false;
  loginFailed = false
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private router: Router
  ) {}

  signIn(): void {
    const {login, password} = this.loginForm.value
    this.authService.signIn(
      login,
      password)
      .subscribe(
        (data) => {
          this.tokenService.saveToken(data.token);
          this.loggedIn = true;
          this.router.navigate(['/boards'])
        },
        (error) => {
          console.log(error);
          this.loginFailed = true;
        }
      )
  }



}

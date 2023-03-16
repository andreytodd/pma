import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup = new FormGroup({});
  hide = true;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.compose([Validators.required, Validators.minLength(4)]) ],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)]) ]
    })
  }

  loginFailed = false
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private router: Router,
    private apiService: ApiService
  ) {}

  signIn(): void {
    const {login, password} = this.loginForm.value;
    this.authService.signIn(login, password).subscribe(
        (data) => {
          this.tokenService.saveToken(data.token);
          this.apiService.getUsers().subscribe(
            data => {
              let currentUser = (data.find((user: any) => user.login === login))._id;
              this.tokenService.saveUser(currentUser);
              this.router.navigate(['/boards']);
            }
          )

        },
        (error) => {
          console.log(error);
        }
      )
  }

}

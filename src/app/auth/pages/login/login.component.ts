import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {User} from "../../models/auth.models";
import {MatDialog} from "@angular/material/dialog";
import {ErrorMessageComponent} from "../../../core/dialogs/error-message/error-message.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup = new FormGroup({});
  hide = true;
  submitted = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
          Validators.maxLength(20)

        ],

        ) ],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)]) ]
    });
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private router: Router,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}

  signIn(): void {
    const {login, password} = this.loginForm.value;
    this.authService.signIn(login, password).subscribe(
      (data) => {
        this.tokenService.saveToken(data.token);
        this.apiService.getUsers().subscribe(
          (data) => {
            if (data && Array.isArray(data)) {
              const currentUser: string = (data.find((user: User) => user.login === login))._id;
              this.tokenService.saveUser(currentUser);
              this.router.navigate(['/boards']);
            } else {
              const dialogRef = this.dialog.open(ErrorMessageComponent);
              dialogRef.componentInstance.errorMessage = "Unexpected response format from server";
            }
          },
          (error) => {
            if (error && error.message) {
              const dialogRef = this.dialog.open(ErrorMessageComponent);
              dialogRef.componentInstance.errorMessage = error?.message;
            } else {
              const dialogRef = this.dialog.open(ErrorMessageComponent);
              dialogRef.componentInstance.errorMessage = 'An unknown error occurred';
            }
          }
        );
      },
      (error) => {
        if (error && error.message === 'User not found') {
          const dialogRef = this.dialog.open(ErrorMessageComponent);
          dialogRef.componentInstance.errorMessage = 'User not found';
        } else {
          const dialogRef = this.dialog.open(ErrorMessageComponent);
          dialogRef.componentInstance.errorMessage = 'An unknown error occurred';
        }
      }
    );
  }

}

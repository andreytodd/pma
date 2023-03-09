import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  newUserForm: FormGroup = this.formBuilder.group({
    name: '',
    login: '',
    password: ''
  });
  signUpSuccess = false;
  signUpFailed = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
  }

  signUp(): void {
    const {name, login, password} = this.newUserForm.value
    this.authService.signUp(name, login, password)
        .subscribe(
          (data) => {
            console.log(data);
            this.signUpFailed = false;
            this.signUpSuccess = true;
          },
          (error) => {
            console.log(error);
            this.signUpFailed = true;
          }
        )
    this.newUserForm.reset()
  }


}

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

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
  }

  signUp(): void {
    const {name, login, password} = this.newUserForm.value
    this.authService.signUp(name, login, password)
        .subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            console.log(error);
          }
        )
    this.newUserForm.reset()
  }
}

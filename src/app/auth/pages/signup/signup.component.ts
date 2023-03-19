import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  newUserForm!: FormGroup;
  submitted = false;

  ngOnInit() {
    this.newUserForm = this.formBuilder.group({
        name: ['', Validators.required],
        login: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]
        ],
        password: ['', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20)
        ]],
        confirmPassword: ['', Validators.required]
      }
    );
  }



  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
  }

  signUp(): void {
    const {name, login, password} = this.newUserForm.value
    this.authService.signUp(name, login, password).subscribe(
          () => {
            alert('Registration successful')
          },
          (error) => {
            this.newUserForm.reset()
            alert(error.error.message);
          }
        )
    this.newUserForm.reset()
  }
  get form() {
    return this.newUserForm.controls;
  }

  print() {
    console.log(this.newUserForm.controls)
  }

}

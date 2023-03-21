import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "../../directives/confirm-password.directive";

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
        name: ['', Validators.compose([Validators.required, Validators.minLength(4)]) ],
        login: ['', Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ])
        ],
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20)
        ]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: confirmPasswordValidator
      }
    );
  }



  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
  }

  signUp(): void {
    if (this.newUserForm.valid) {
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
    } else {
      alert('Invalid form')
      this.newUserForm.reset()
    }

  }
  get form() {
    return this.newUserForm.controls;
  }

  print() {
    console.log(this.newUserForm.valid)
  }

}

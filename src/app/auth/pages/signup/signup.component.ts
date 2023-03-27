import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "../../directives/confirm-password.directive";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ErrorMessageComponent} from "../../../core/dialogs/error-message/error-message.component";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  newUserForm!: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog
    ) {
  }

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

  signUp(): void {
    if (this.newUserForm.valid) {
      const {name, login, password} = this.newUserForm.value;
      this.authService.signUp(name, login, password).subscribe(
        () => {
          alert('Registration successful');
        },
        (error) => {
          this.newUserForm.reset();
          this.createDialog(error.message);
        }
      );
      this.newUserForm.reset();
    } else {
      this.createDialog('Invalid form');
      this.newUserForm.reset();
    }
    this.router.navigate(['/auth/signup']);
  }
  get form() {
    return this.newUserForm.controls;
  }

  createDialog(message: string) {
    const dialogRef = this.dialog.open(ErrorMessageComponent);
    dialogRef.componentInstance.errorMessage = message;
  }
}

import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {EditUser} from "../../../auth/models/auth.models";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../auth/services/auth.service";
import {ErrorMessageComponent} from "../error-message/error-message.component";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  userId!: string;
  userLogin!: string;


  editUserForm = new FormGroup({
    name: new FormControl(),
    login: new FormControl(),
    password: new FormControl()
  })

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private authService: AuthService
    ) {
  }

  onSubmit() {
    this.authService.signIn(this.userLogin, this.editUserForm.value.password)
      .subscribe(() => {
        this.apiService.editUser(this.userId, this.editUserForm.value as EditUser)
      });
    this.dialog.closeAll();
  }

}

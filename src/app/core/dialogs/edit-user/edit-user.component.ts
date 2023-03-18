import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {EditUser} from "../../../auth/models/auth.models";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  userId!: string;


  editUserForm = new FormGroup({
    name: new FormControl(),
    login: new FormControl(),
    password: new FormControl()
  })

  constructor(private apiService: ApiService) {
  }

  onSubmit() {
    this.apiService.editUser(this.userId, this.editUserForm.value as EditUser)
  }

}
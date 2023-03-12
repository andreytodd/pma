import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../services/api.service";
import {TokenService} from "../../../../auth/services/token.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
    private tokenService: TokenService
  ) {}

  createBoardForm = new FormGroup({
    title: new FormControl(),
    sharedUsers: new FormArray([
      this.createUser()
    ])
  })

  get sharedUsers() {return this.createBoardForm.get('sharedUsers') as FormArray}

  createUser() {
    return new FormGroup({
      login: new FormControl()
    })
  }

  addPhone() {
    this.sharedUsers.push(this.createUser());
  }

  createNewBoard() {
    // this.apiService.createBoard({
    //   owner: this.tokenService.getCurrentUserId(),
    //   title: this.createBoardForm.value.title,
    //   users: this.createBoardForm.value.sharedUsers.map(user => {
    //     this.apiService.getUser(user.user)
    //   })
    // })

  }

}

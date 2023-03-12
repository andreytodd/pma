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

  addUser() {
    this.sharedUsers.push(this.createUser());
  }

  createNewBoard() {
    let arr: any[] | undefined = []
    if (this.createBoardForm.value.sharedUsers?.[0].login !== null) {
      arr = this.createBoardForm.value.sharedUsers?.map(user => user.login)
    }

    this.apiService.getUsers()
      .subscribe((data) => {
          let users: string[] = data
            .filter((user: any) => arr?.includes(user.login))
            .map((user: any) => user._id)
        this.apiService.createBoard({
          owner: this.tokenService.getCurrentUserId(),
          title: this.createBoardForm.value.title,
          users: users
          })
        })
    this.dialog.closeAll();
  }

}

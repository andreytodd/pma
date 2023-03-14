import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {TokenService} from "../../../auth/services/token.service";

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.scss']
})
export class EditBoardComponent {
  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
    private tokenService: TokenService
  ) {}

  public boardId: string = '';
  public boardTitle: string = '';

  updateBoardForm = new FormGroup({
    title: new FormControl(),
    sharedUsers: new FormArray([
      this.createUser()
    ])
  })

  get sharedUsers() {return this.updateBoardForm.get('sharedUsers') as FormArray}

  createUser() {
    return new FormGroup({
      login: new FormControl()
    })
  }

  addUser() {
    this.sharedUsers.push(this.createUser());
  }

  updateBoard() {
    let arr: any[] | undefined = []
    if (this.updateBoardForm.value.sharedUsers?.[0].login !== null) {
      arr = this.updateBoardForm.value.sharedUsers?.map(user => user.login)
    }

    this.apiService.getUsers()
      .subscribe((data) => {
        let users: string[] = data
          .filter((user: any) => arr?.includes(user.login))
          .map((user: any) => user._id)
        this.apiService.updateBoard(this.boardId, {
          owner: this.tokenService.getCurrentUserId(),
          title: this.updateBoardForm.value.title,
          users: users
        })
      })
    this.dialog.closeAll();
  }
}

import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {TokenService} from "../../../auth/services/token.service";
import {User} from "../../../auth/models/auth.models";

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.scss']
})
export class EditBoardComponent implements OnInit {

  currentUserId!: string;
  allUsers!: User[];
  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
    private tokenService: TokenService
  ) {}

  public boardId: string = '';
  public boardTitle: string = '';

  ngOnInit() {
    this.currentUserId =  this.tokenService.getCurrentUserId()
    this.apiService.getUsers().subscribe((data) => {
      this.allUsers = data
        .filter((user: User) => user._id !== this.currentUserId)
    })
  }

  updateBoardForm = new FormGroup({
    title: new FormControl(this.boardId),
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
    // let arr: any[] | undefined = []
    // if (this.updateBoardForm.value.sharedUsers?.[0].login !== null) {
    //   arr = this.updateBoardForm.value.sharedUsers?.map(user => user.login)
    // }

    const userLogins = this.updateBoardForm.value.sharedUsers?.map((user) => {
      return user.login
    })
    if(!this.updateBoardForm.value.title) {
      this.updateBoardForm.value.title = 'Board without name'
    }
    const users = this.allUsers
      .filter((user) => userLogins?.includes(user.login))
      .map((user: User) => user._id)
    this.apiService.updateBoard(this.boardId, {
      owner: this.tokenService.getCurrentUserId(),
      title: this.updateBoardForm.value.title,
      users: users
    })

    // this.apiService.getUsers()
    //   .subscribe((data) => {
    //     let users: string[] = data
    //       .filter((user: any) => arr?.includes(user.login))
    //       .map((user: any) => user._id)
    //     this.apiService.updateBoard(this.boardId, {
    //       owner: this.tokenService.getCurrentUserId(),
    //       title: this.updateBoardForm.value.title as string,
    //       users: users
    //     })
    //   })
    this.dialog.closeAll();
  }
}

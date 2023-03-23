import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {TokenService} from "../../../auth/services/token.service";
import {User} from "../../../auth/models/auth.models";

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit{

  allUsers!: User[];
  currentUserId!: string;
  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.currentUserId =  this.tokenService.getCurrentUserId()
    this.apiService.getUsers().subscribe(data => {
      this.allUsers = data
        .filter((user: User) => user._id !== this.currentUserId)
    })
  }

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
    const userLogins = this.createBoardForm.value.sharedUsers?.map((user) => {
      return user.login
    })
    if(!this.createBoardForm.value.title) {
      this.createBoardForm.value.title = 'New board without name'
    }
    const users = this.allUsers
      .filter((user) => userLogins?.includes(user.login))
      .map((user: User) => user._id)
    this.apiService.createBoard({
      owner: this.tokenService.getCurrentUserId(),
      title: this.createBoardForm.value.title,
      users: users
    })
    this.dialog.closeAll();
  }

}

import {Component, OnInit} from '@angular/core';
import {User} from "../../models/auth.models";
import {ApiService} from "../../../core/services/api.service";
import {TokenService} from "../../services/token.service";
import {BehaviorSubject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {EditUserComponent} from "../../../core/dialogs/edit-user/edit-user.component";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit{
  currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(<User>{})

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private dialog: MatDialog
  ) {
  }

  // TODO: TypeError - cannot read properties of undefined on init
  ngOnInit() {
    this.currentUser$ = this.apiService.getUserById(this.tokenService.getCurrentUserId())
  }

  editUser() {
    const dialogRef = this.dialog.open(EditUserComponent);
    dialogRef.componentInstance.userId = this.currentUser$.getValue()._id
  }
}

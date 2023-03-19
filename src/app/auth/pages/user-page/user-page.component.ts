import {Component, OnInit} from '@angular/core';
import {User} from "../../models/auth.models";
import {ApiService} from "../../../core/services/api.service";
import {TokenService} from "../../services/token.service";
import {BehaviorSubject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {EditUserComponent} from "../../../core/dialogs/edit-user/edit-user.component";
import {ConfirmationDialogComponent} from "../../../core/dialogs/confirmation-dialog/confirmation-dialog.component";
import {Router} from "@angular/router";

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
    private dialog: MatDialog,
    private router: Router
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

  deleteUser() {
    this.apiService.deleteUser(this.tokenService.getCurrentUserId()).subscribe(() => {
      this.tokenService.signOut();
      this.router.navigate([''])
      window.location.reload();
    },
      error => alert(error.message)
    )


  }

  showConfirmationDialog() {
    const dialogRef =  this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.confirmationMessage = 'Are you sure you want to delete your profile?';
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser()
      }
    })
  }
}

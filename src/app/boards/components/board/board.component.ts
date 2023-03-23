import {ChangeDetectionStrategy, Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {ConfirmationDialogComponent} from "../../../core/dialogs/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EditBoardComponent} from "../../../core/dialogs/edit-board/edit-board.component";
import {Router} from "@angular/router";
import {User} from "../../../auth/models/auth.models";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit{
  @Input() board: any
  sharedUsers$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  sharedUsers!: string[]
  allUsers!: User[]

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.apiService.getUsers().subscribe((users: User[]) => {
        const sharedUsers = users
          .filter((user) => this.board.users.includes(user._id))
          .map((user) => {
            return user.login
          })
          .join(', ')
      this.sharedUsers$.next(sharedUsers)

    })

  }


  deleteBoard() {
    this.apiService.deleteBoard(this.board._id)
  }

  updateBoard() {
    const dialogRef = this.dialog.open(EditBoardComponent);
    dialogRef.componentInstance.boardId = this.board._id;
    dialogRef.componentInstance.boardTitle = this.board.title;
  }

  showConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.confirmationMessage = 'Are you sure want to delete this board?'
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBoard()
      }
    })
  }

  openBoardCard(): void {
    this.apiService.getAllColumnsInBoard(this.board._id);
    this.router.navigate(['board', this.board._id]);

  }

}

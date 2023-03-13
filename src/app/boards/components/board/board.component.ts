import {ChangeDetectionStrategy, Component, Input, OnInit, Output} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {ConfirmationDialogComponent} from "../../../core/dialogs/confirmation-dialog/confirmation-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditBoardComponent} from "../../../core/dialogs/edit-board/edit-board.component";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
  @Input() board: any

  constructor(private apiService: ApiService, public dialog: MatDialog) {
  }


  deleteBoard() {
    this.apiService.deleteBoard(this.board._id)
  }

  updateBoard() {
    const dialogRef = this.dialog.open(EditBoardComponent);
    dialogRef.componentInstance.boardId = this.board._id;
    console.log(this.board._id)
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

}

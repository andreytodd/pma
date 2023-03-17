import {Component, Input, OnInit} from '@angular/core';
import {GetColumnsModel} from "../../models/boards.model";
import {ApiService} from "../../../core/services/api.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../../core/dialogs/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss']
})
export class BoardColumnComponent {
  @Input() column!: GetColumnsModel;
  @Input() boardId!: string;
  private allColumns: GetColumnsModel[] = [];

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  deleteColumn() {
    this.apiService.deleteColumnById(this.boardId, this.column._id);
  }

  showConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.confirmationMessage = 'Are you sure want to delete this column?'
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteColumn()
      }
    })
  }
}

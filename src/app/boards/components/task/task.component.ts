import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskFormModel, TaskModel} from "../../models/boards.model";
import {ConfirmationDialogComponent} from "../../../core/dialogs/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  constructor(private dialog: MatDialog) {
  }

  @Input() task!: TaskModel;
  @Output() deleteTaskEmitter = new EventEmitter();

  deleteTask() {
    this.deleteTaskEmitter.emit(this.task._id)
  }

  showConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.confirmationMessage = 'Are you sure want to delete this board?'
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask()
      }
    })
  }

}

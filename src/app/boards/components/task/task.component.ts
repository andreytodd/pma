import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskFormModel, TaskModel} from "../../models/boards.model";
import {ConfirmationDialogComponent} from "../../../core/dialogs/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskComponent} from "../../../core/dialogs/edit-task/edit-task.component";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  constructor(private dialog: MatDialog) {
  }

  @Input() task!: TaskModel;
  @Input() columnId!: string;
  @Input() boardId!: string;
  @Output() taskEmitter = new EventEmitter();

  deleteTask() {
    this.taskEmitter.emit(this.task._id)
  }

  editTask() {
    this.taskEmitter.emit()
  }

  showConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.confirmationMessage = 'Are you sure want to delete this task?'
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask()
      }
    })
  }

  showEditTask() {
    const dialogRef = this.dialog.open(EditTaskComponent)
    dialogRef.componentInstance.boardId = this.boardId;
    dialogRef.componentInstance.columnId = this.columnId;
    dialogRef.componentInstance.task = this.task;
    dialogRef.afterClosed().subscribe(() => {
      this.editTask()
    })
  }

}

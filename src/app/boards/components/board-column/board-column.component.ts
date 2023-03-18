import {Component, Input, OnInit} from '@angular/core';
import {GetColumnsModel, TaskFormModel, TaskModel} from "../../models/boards.model";
import {ApiService} from "../../../core/services/api.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../../core/dialogs/confirmation-dialog/confirmation-dialog.component";
import {CreateTaskComponent} from "../../../core/dialogs/create-task/create-task.component";
import {BehaviorSubject} from "rxjs";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss']
})
export class BoardColumnComponent implements OnInit{
  @Input() column!: GetColumnsModel;
  @Input() boardId!: string;
  allTasksInColumn$: BehaviorSubject<TaskModel[]> = new BehaviorSubject<TaskModel[]>([])
  allTasksInColumn!: TaskModel[]
  private allColumns: GetColumnsModel[] = [];

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit() {
    this.apiService.getTasksInColumn(this.boardId, this.column._id).subscribe((tasks) => {
      this.allTasksInColumn$.next(tasks);
      this.allTasksInColumn = tasks;
    })
  }

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

  createTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskComponent)
    dialogRef.componentInstance.boardId = this.boardId
    dialogRef.componentInstance.columnId = this.column._id
    dialogRef.afterClosed().subscribe(() => {
      this.apiService.getTasksInColumn(this.boardId, this.column._id)
        .subscribe((tasks) => {
          this.allTasksInColumn$.next(tasks);
      })
    })
  }

  onDeleteTask(taskId: string) {
    this.apiService.deleteTask(this.boardId, this.column._id, taskId).subscribe()
    this.apiService.getTasksInColumn(this.boardId, this.column._id).subscribe((tasks) => {
      const newTasksList = [...tasks].filter((task) => task._id !== taskId)
      this.allTasksInColumn$.next(newTasksList);
    })
  }

  showTasks() {
    this.apiService.getTasksInColumn(this.boardId, this.column._id).subscribe(data => {
      console.log(data)
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allTasksInColumn, event.previousIndex, event.currentIndex);
    console.log(event.item)
  }

}

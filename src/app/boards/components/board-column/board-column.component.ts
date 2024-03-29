import {Component, Input, OnInit} from '@angular/core';
import {GetColumnsModel, TaskModel} from "../../models/boards.model";
import {ApiService} from "../../../core/services/api.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../../core/dialogs/confirmation-dialog/confirmation-dialog.component";
import {CreateTaskComponent} from "../../../core/dialogs/create-task/create-task.component";
import {BehaviorSubject} from "rxjs";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss']
})
export class BoardColumnComponent implements OnInit{
  @Input() column!: GetColumnsModel;
  @Input() boardId!: string;
  allTasksInColumn$: BehaviorSubject<TaskModel[]> = new BehaviorSubject<TaskModel[]>([]);
  allTasksInColumn!: TaskModel[];
  isEditingTitle = false;
  titleCopy!: string;

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  editTitle() {
    this.titleCopy = this.column.title;
    this.isEditingTitle = true;
  }

  cancelEditTitle() {
    this.isEditingTitle = false;
    this.titleCopy = this.column.title;
  }

  saveTitle() {
    if (this.titleCopy !== this.column.title) {
      this.apiService.updateColumn(this.boardId, this.column._id, {
        title: this.titleCopy,
        order: this.column.order
      }).subscribe(() => {
        this.column.title = this.titleCopy;
        this.isEditingTitle = false;
      });
    } else {
      this.isEditingTitle = false;
    }
  }

  ngOnInit() {
    this.apiService.getTasksInColumn(this.boardId, this.column._id).subscribe((tasks) => {
      this.allTasksInColumn$.next(tasks);
      this.allTasksInColumn = tasks;
    });
    this.titleCopy = this.column.title;
  }

  deleteColumn() {
    this.apiService.deleteColumnById(this.boardId, this.column._id);
  }

  showConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.confirmationMessage = 'Are you sure want to delete this column?';
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteColumn();
      }
    });
  }

  createTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskComponent);
    dialogRef.componentInstance.boardId = this.boardId;
    dialogRef.componentInstance.columnId = this.column._id;
    dialogRef.afterClosed().subscribe(() => {
      this.apiService.getTasksInColumn(this.boardId, this.column._id)
        .subscribe((tasks) => {
          this.allTasksInColumn$.next(tasks);
          this.allTasksInColumn = tasks;
      });
    });
  }

  onDeleteTask(taskId: string) {
    this.apiService.deleteTask(this.boardId, this.column._id, taskId).subscribe();
    this.apiService.getTasksInColumn(this.boardId, this.column._id).subscribe((tasks) => {
      const newTasksList = [...tasks].filter((task) => task._id !== taskId);
      this.allTasksInColumn$.next(newTasksList);
    });
  }

  drop(event: CdkDragDrop<TaskModel[]>) {
    if (!this.allTasksInColumn) {
      return;
    }

    this.allTasksInColumn$.subscribe(data => {
      this.allTasksInColumn = data;
    });

    if (event.previousContainer === event.container) {
      moveItemInArray(this.allTasksInColumn, event.previousIndex, event.currentIndex);
      if (event.previousIndex !== event.currentIndex) {
        const updatedTasks = this.allTasksInColumn.map((task, index) => {
          const { _id, columnId } = task;
          return {
            _id,
            columnId,
            order: index
          };
        });

        this.apiService.updateTaskOrder(updatedTasks)
          .subscribe(tasks => {
            this.allTasksInColumn$.next(tasks);
          });
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const updatedTasks = event.container.data.map((task, index) => {
        const { _id } = task;
        return {
          _id,
          columnId: this.column._id,
          order: index
        };
      });

      this.apiService.updateTaskColumns(updatedTasks)
        .subscribe(tasks => {
          this.allTasksInColumn$.next(tasks);
        });
    }

  }

}

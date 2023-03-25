import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {TaskModel} from "../../../boards/models/boards.model";
import {TokenService} from "../../../auth/services/token.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {

  boardId!: string;
  columnId!: string;
  task!: TaskModel;


  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private dialog: MatDialog
    ) {
  }
  editTaskForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl()
  })

  editTask() {
    this.apiService.editTask(this.boardId, this.columnId, this.task._id, {
      title: this.editTaskForm.value.title,
      description: this.editTaskForm.value.description,
      order: this.task.order,
      userId: this.tokenService.getCurrentUserId(),
      columnId: this.columnId,
      users: []
    }).subscribe()
    this.dialog.closeAll();
  }

}

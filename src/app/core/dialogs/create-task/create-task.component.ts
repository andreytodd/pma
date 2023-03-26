import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {TaskFormModel} from "../../../boards/models/boards.model";
import {TokenService} from "../../../auth/services/token.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  columnId!: string;
  boardId!: string;
  allTasksArray!: TaskFormModel[];
  userId!: string;

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private dialog: MatDialog
    ) {
  }

  ngOnInit() {
    this.apiService.getTasksInColumn(this.boardId, this.columnId).subscribe((data) => {
      this.allTasksArray = data;
    })
    this.userId = this.tokenService.getCurrentUserId()
  }

  createTaskForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    sharedUsers: new FormArray([
      this.createUser()
    ])
  })

  get sharedUsers() {return this.createTaskForm.get('sharedUsers') as FormArray}

  createUser() {
    return new FormGroup({
      login: new FormControl()
    })
  }

  addUser() {
    this.sharedUsers.push(this.createUser());
  }

  createNewTask() {
    if (!this.createTaskForm.value.title) {
      alert('Enter title!')
      return
    }
    if (!this.createTaskForm.value.description) {
      this.createTaskForm.value.description = 'No description'
    }
    this.apiService.createTask(this.boardId, this.columnId, {
      title: this.createTaskForm.value.title,
      description: this.createTaskForm.value.description,
      userId: this.userId,
      users: [],
      order: this.allTasksArray.length
    }).subscribe()
    this.dialog.closeAll()
  }
}

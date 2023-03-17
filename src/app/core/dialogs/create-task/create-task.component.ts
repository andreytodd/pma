import { Component } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {

  constructor(private apiService: ApiService) {
  }

  createTaskForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),

  })

  createTask() {

  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskFormModel, TaskModel} from "../../models/boards.model";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task!: TaskModel;
  @Output() deleteTaskEmitter = new EventEmitter();

  deleteTask() {
    this.deleteTaskEmitter.emit(this.task._id)
  }

}

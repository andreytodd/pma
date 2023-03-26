import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss']
})
export class CreateColumnComponent {
  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
  ) {}

  public boardId: string = '';
  public order: number = 0;

  createColumnForm = new FormGroup({
    title: new FormControl()
  })

  createColumn() {
    if (!this.createColumnForm.value.title) {
      this.createColumnForm.value.title = 'Untitled column';
    }
    this.apiService.createColumn(this.boardId, {
      title: this.createColumnForm.value.title,
      order: this.order
    })
    this.dialog.closeAll();
  }

}

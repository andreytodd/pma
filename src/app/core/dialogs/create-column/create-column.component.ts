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

  createColumnForm = new FormGroup({
    title: new FormControl()
  })

  createColumn() {

  }

}

import {Component, OnInit, Input, DoCheck, ElementRef} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {Observable} from "rxjs";
import { GetColumnsModel } from "../../models/boards.model";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CreateColumnComponent} from "../../../core/dialogs/create-column/create-column.component";
import {ColumnIdService} from "../../services/column-id.service";
import {CreateTaskComponent} from "../../../core/dialogs/create-task/create-task.component";

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {

  boardId: string = this.activatedRoute.snapshot.params['id'];
  boardName!: string;

  allColumns$!: Observable<GetColumnsModel[]>
  allColumns!: GetColumnsModel[];
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private columnIdService: ColumnIdService,
    private element: ElementRef
    ) {
  }


  ngOnInit() {
    this.allColumns$ = this.apiService.getAllColumnsInBoard(this.boardId);
    this.allColumns$.subscribe((data) => {
      this.allColumns = data;
    })
    this.apiService.getBoardById(this.boardId).subscribe((board) => {
      this.boardName = board.title;
    })
  }

  createColumn() {
    const dialogRef = this.dialog.open(CreateColumnComponent);
    dialogRef.componentInstance.boardId = this.boardId;
    dialogRef.componentInstance.order = this.allColumns.length + 1
  }


}

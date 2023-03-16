import {Component, OnInit, Input} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import { Observable } from "rxjs";
import { GetColumnsModel } from "../../models/boards.model";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CreateColumnComponent} from "../../../core/dialogs/create-column/create-column.component";
import {ColumnIdService} from "../../services/column-id.service";

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit{

  boardId!: string;
  columnsArray!: GetColumnsModel[];

  allColumns$!: Observable<GetColumnsModel[]>
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private columnIdService: ColumnIdService
    ) {
  }


  ngOnInit() {
    this.boardId = this.activatedRoute.snapshot.params['id'];
    this.allColumns$ = this.apiService.getAllColumnsInBoard(this.boardId);
    this.allColumns$.subscribe(data => {
      this.columnsArray = [...data]
    })
  }

  createColumn() {
    const dialogRef = this.dialog.open(CreateColumnComponent);
    dialogRef.componentInstance.boardId = this.boardId;
    // dialogRef.componentInstance.order = this.columnsArray.length;
    // console.log(this.columnIdService.columnId.getValue())
    dialogRef.componentInstance.order = this.columnIdService.columnId.getValue()
    // this.columnIdService.columnId.next(dialogRef.componentInstance.order + 1)
    this.allColumns$.subscribe((data) => {
      this.columnIdService.columnId.next([...data].length)
    })
  }

}

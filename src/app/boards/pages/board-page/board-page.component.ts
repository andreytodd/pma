import {Component, OnInit, Input} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {Observable} from "rxjs";
import {CreateColumnModel, GetColumnsModel} from "../../models/boards.model";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CreateColumnComponent} from "../../../core/dialogs/create-column/create-column.component";

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit{

  boardId: string = '';
  public columnOrder: number = 0;

  allColumns$!: Observable<GetColumnsModel[]>
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
    ) {
  }


  ngOnInit() {
    this.boardId = this.activatedRoute.snapshot.params['id'];
    this.allColumns$ = this.apiService.getAllColumnsInBoard(this.boardId);
    this.allColumns$.subscribe(data => console.log(data))
  }

  createColumn() {
    const dialogRef = this.dialog.open(CreateColumnComponent);
    dialogRef.componentInstance.boardId = this.boardId
    dialogRef.componentInstance.order = this.columnOrder
    this.columnOrder++
  }

}

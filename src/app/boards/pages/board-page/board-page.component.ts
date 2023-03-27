import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {BehaviorSubject} from "rxjs";
import { GetColumnsModel } from "../../models/boards.model";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CreateColumnComponent} from "../../../core/dialogs/create-column/create-column.component";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {

  boardId: string = this.activatedRoute.snapshot.params['id'];
  boardName!: string;

  allColumns$: BehaviorSubject<GetColumnsModel[]> = new BehaviorSubject<GetColumnsModel[]>([]);
  allColumns!: GetColumnsModel[];
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    ) {
  }


  ngOnInit() {
    this.apiService.getAllColumnsInBoard(this.boardId).subscribe((columns) => {
      this.allColumns$.next(columns);
    });
    this.apiService.getBoardById(this.boardId).subscribe((board) => {
      this.boardName = board.title;
    });
  }

  createColumn() {
    const dialogRef = this.dialog.open(CreateColumnComponent);
    dialogRef.componentInstance.boardId = this.boardId;
    dialogRef.componentInstance.order = this.allColumns$.getValue().length;
  }

  drop(event: CdkDragDrop<GetColumnsModel>) {

    this.allColumns$.subscribe((columns) => {
      this.allColumns = columns;
    });

    if (!this.allColumns) {
      return;
    }
      moveItemInArray(this.allColumns, event.previousIndex, event.currentIndex);
      if (event.previousIndex !== event.currentIndex) {
        const updatedColumns = this.allColumns.map((column, index) => {
          const {_id} = column;
          return {
            _id,
            order: index
          };
        });

        this.apiService.updateColumns(updatedColumns)
          .subscribe(columns => {
            this.allColumns$.next(columns);
          });
      }
  }

}

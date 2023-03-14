import {Component, OnInit, Input} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {Observable} from "rxjs";
import {CreateColumnModel} from "../../models/boards.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit{

  boardId: string = '';

  allColumns$!: Observable<CreateColumnModel[]>
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
    ) {
  }
  public columnOrder: number = 0;

  ngOnInit() {
    this.boardId = this.activatedRoute.snapshot.params['id'];
    this.allColumns$ = this.apiService.getAllColumnsInBoard(this.boardId);
  }

  createColumn() {
    this.allColumns$.subscribe(data => console.log(data))
  }

}

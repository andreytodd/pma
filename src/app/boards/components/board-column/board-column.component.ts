import {Component, Input} from '@angular/core';
import {GetColumnsModel} from "../../models/boards.model";
import {ApiService} from "../../../core/services/api.service";

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss']
})
export class BoardColumnComponent {
  @Input() column!: GetColumnsModel;
  @Input() boardId!: string;

  constructor(private apiService: ApiService) {}

  deleteColumn() {
    this.apiService.deleteColumnById(this.boardId, this.column._id);
  }
}

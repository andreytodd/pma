import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {User} from "../../../auth/models/auth.models";
import {Observable} from "rxjs";
import {TokenService} from "../../../auth/services/token.service";
import {CreateBoardComponent} from "../../../core/dialogs/create-board/create-board.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
  host: {
    class:'boards-page'
  }
})
export class BoardsPageComponent implements OnInit {
  allBoards$!: Observable<any>;
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.allBoards$ = this.apiService.getBoardsByUserId(this.tokenService.getCurrentUserId());
  }

  showModal() {
    this.dialog.open(CreateBoardComponent);
  }

}

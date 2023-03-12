import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {User} from "../../../auth/models/auth.models";
import {Observable} from "rxjs";
import {TokenService} from "../../../auth/services/token.service";


@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  allBoards$!: Observable<any>;
  constructor(private apiService: ApiService, private tokenService: TokenService) {
  }

  ngOnInit() {
    this.allBoards$ = this.apiService.getBoardsByUserId(this.tokenService.getCurrentUserId());
  }

  getUsers() {
    this.apiService.getUsers().subscribe(
      (data: User[]) => console.log(data),
      (error: Error) => console.log(error)
      )
  }

  getAllBoards() {
    this.apiService.getBoards()
      .subscribe(data => console.log(data))
  }

}

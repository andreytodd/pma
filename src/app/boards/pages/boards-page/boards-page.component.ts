import { Component } from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {User} from "../../../auth/models/auth.models";
import {createBoardData} from "../../models/boards.model";
import {TokenService} from "../../../auth/services/token.service";


@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss']
})
export class BoardsPageComponent {
  constructor(private apiService: ApiService, private tokenService: TokenService) {
  }

  getUsers() {
    this.apiService.getUsers().subscribe(
      (data: User[]) => console.log(data),
      (error: Error) => console.log(error)
      )
  }

  getBoards() {
    this.apiService.getBoards().subscribe(
      data => console.log(data)
    )
  }

}

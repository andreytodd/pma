import { Component } from '@angular/core';
import {ApiService} from "../../../core/services/api.service";



@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss']
})
export class BoardsPageComponent {
  constructor(private apiService: ApiService) {
  }

  getUsers() {
    this.apiService.getUsers().subscribe(
      (data: any) => console.log(data),
      (error: Error) => console.log(error)
      )
  }
}

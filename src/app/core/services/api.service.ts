import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../auth/models/auth.models";
import {Observable} from "rxjs";
import {createBoardData} from "../../boards/models/boards.model";

const USERS_API = 'http://localhost:3000/users'
const BOARDS_API = 'http://localhost:3000/boards'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUserId() {

  }

  getUsers(): Observable<any> {
    return this.http.get(USERS_API)
  }

  getUser(login: string) {
    let id: string = ''
    this.getUsers().subscribe(
      (data) => {
        id = (data.filter((user: User) => user.login === login))[0]._id
      }
    )
    return id
  }

  getBoards() {
    return this.http.get(BOARDS_API);
  }

  createBoard(data: createBoardData) {
    return this.http.post(BOARDS_API, data);
  }

}
